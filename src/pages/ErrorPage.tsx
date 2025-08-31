export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Página No Encontrada</h2>
      <p className="mt-2 text-gray-600">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Regresar a la página de inicio
      </a>
    </div>
  );
};
