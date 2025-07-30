const supabase = supabase.createClient(
  'https://paktfgnzospbxnbvmyzc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBha3RmZ256b3NwYnhuYnZteXpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTc4MjYsImV4cCI6MjA2OTQ3MzgyNn0.GAxrht670Nc7IPd-3aikRa-eo5uTwVy1sbuqsbwUcQk'
);

async function cargarPropiedades() {
  const { data, error } = await supabase
    .from("propiedades")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error cargando propiedades:", error);
    return;
  }

  const lista = document.getElementById("lista-propiedades");
  lista.innerHTML = "";
  data.forEach((p) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.titulo}</td>
      <td>${p.descripcion}</td>
      <td>S/ ${p.precio}</td>
      <td>${p.distrito}</td>
      <td>${p.tipo}</td>
    `;
    lista.appendChild(fila);
  });
}

document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();
  const titulo = document.getElementById("titulo").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const precio = parseFloat(document.getElementById("precio").value);
  const distrito = document.getElementById("distrito").value.trim();
  const tipo = document.getElementById("tipo").value.trim();

  const { error } = await supabase.from("propiedades").insert([
    { titulo, descripcion, precio, distrito, tipo }
  ]);

  if (error) {
    alert("Error al guardar: " + error.message);
    return;
  }

  e.target.reset();
  cargarPropiedades();
});

cargarPropiedades();
