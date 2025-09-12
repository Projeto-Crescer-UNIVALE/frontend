const API_BASE = "http://localhost:3000";
const OFICINAS_ENDPOINT = `${API_BASE}/oficinas`;
const PROFESSORES_ENDPOINT = `${API_BASE}/professores`;

// Helper: pega as linhas de dia e retorna array {dia, inicio, fim}
function getDaysFromForm() {
  const rows = document.querySelectorAll('.dias-semana .dia-row');
  const selected = [];
  rows.forEach(row => {
    const cb = row.querySelector('input[type="checkbox"]');
    if (!cb) return;
    if (cb.checked) {
      const dia = cb.dataset.dia?.trim() || cb.parentNode.textContent.trim();
      const inicioInput = row.querySelector('input.inicio');
      const fimInput = row.querySelector('input.fim');
      const inicio = inicioInput ? inicioInput.value : null;
      const fim = fimInput ? fimInput.value : null;
      selected.push({ dia, inicio, fim });
    }
  });
  return selected;
}

// Popular select de professores (opcional)
async function loadProfessores() {
  const sel = document.querySelector('#professor');
  if (!sel) return;
  try {
    const res = await axios.get(PROFESSORES_ENDPOINT);
    const profs = res.data || [];
    sel.innerHTML = `<option value="">Selecione uma opção</option>`;
    profs.forEach(p => {
      const nome = p.nome ?? `${p.firstName || ''} ${p.lastName || ''}`.trim();
      sel.innerHTML += `<option value="${p.id}">${nome || 'Professor'}</option>`;
    });
  } catch (err) {
    console.warn('Não foi possível carregar professores (tudo bem se endpoint não existir)', err);
  }
}

// Adicionar oficina (POST)
async function adicionarOficina(e) {
  e.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  const professorId = document.querySelector('#professor')?.value || null;
  const dias = getDaysFromForm();

  if (!nome) { alert('Preencha o nome da oficina'); return; }

  // Montar payload (duas opções explicadas abaixo)
  const payload = {
    nome,
    professorId,
    // formato 1 (simples): só nomes dos dias
    diasSemana: dias.map(d => d.dia),
    // formato 2 (com horários por dia) — altere conforme seu backend aceita
    horarios: dias.map(d => ({ dia: d.dia, inicio: d.inicio, fim: d.fim }))
  };

  try {
    await axios.post(OFICINAS_ENDPOINT, payload);
    alert('Oficina criada com sucesso!');
    // redireciona para a lista (altere se tiver outra rota)
    window.location.href = 'lista-oficinas.html';
  } catch (err) {
    console.error('Erro ao criar oficina', err);
    const msg = err.response?.data?.message || err.message || 'Erro ao criar oficina';
    alert(msg);
  }
}

// Carregar uma oficina para edição (GET /oficinas/:id)
async function carregarOficina(id) {
  try {
    const res = await axios.get(`${OFICINAS_ENDPOINT}/${id}`);
    const o = res.data;
    if (!o) throw new Error('Oficina não encontrada');

    document.querySelector('#nome').value = o.nome ?? '';
    const professorSelect = document.querySelector('#professor');
    if (professorSelect) {
      // backend pode retornar professorId ou objeto professor
      professorSelect.value = o.professorId ?? o.professor?.id ?? '';
    }

    // preencher dias/horários:
    const rows = document.querySelectorAll('.dias-semana .dia-row');
    rows.forEach(row => {
      const cb = row.querySelector('input[type="checkbox"]');
      const dia = cb.dataset.dia?.trim() || cb.parentNode.textContent.trim();
      // tentar achar horários no objeto retornado (verifique como o backend devolve)
      const found = (o.horarios || []).find(h => h.dia?.toLowerCase() === dia.toLowerCase())
                    || ((o.diasSemana || []).includes(dia) ? { dia } : null);

      if (found) {
        cb.checked = true;
        const inicioInput = row.querySelector('input.inicio');
        const fimInput = row.querySelector('input.fim');
        if (inicioInput && found.inicio) inicioInput.value = found.inicio;
        if (fimInput && found.fim) fimInput.value = found.fim;
      } else {
        cb.checked = false;
      }
    });
  } catch (err) {
    console.error('Erro ao carregar oficina', err);
    alert('Erro ao carregar dados da oficina (veja console)');
  }
}

// Salvar alterações (PUT /oficinas/:id)
async function salvarAlteracoes(e, id) {
  e.preventDefault();
  const nome = document.querySelector('#nome').value.trim();
  const professorId = document.querySelector('#professor')?.value || null;
  const dias = getDaysFromForm();

  const payload = {
    nome,
    professorId,
    diasSemana: dias.map(d => d.dia),
    horarios: dias.map(d => ({ dia: d.dia, inicio: d.inicio, fim: d.fim }))
  };

  try {
    await axios.put(`${OFICINAS_ENDPOINT}/${id}`, payload);
    alert('Oficina atualizada!');
    window.location.href = 'lista-oficinas.html';
  } catch (err) {
    console.error('Erro ao atualizar oficina', err);
    alert(err.response?.data?.message || 'Erro ao atualizar oficina');
  }
}

// Inicialização: se URL tem ?id=xxxx -> modo edição, senão modo criar
document.addEventListener('DOMContentLoaded', async () => {
  await loadProfessores(); // opcional

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const form = document.querySelector('form');
  if (!form) return;

  if (id) {
    // edição
    await carregarOficina(id);
    form.addEventListener('submit', (e) => salvarAlteracoes(e, id));
    const btn = form.querySelector('button[type="submit"]');
    if (btn) btn.textContent = 'Salvar alterações';
  } else {
    // criação
    form.addEventListener('submit', adicionarOficina);
  }
});
