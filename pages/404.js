export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-bux-blue mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found.</p>
      <a href="/" className="px-6 py-3 bg-bux-blue text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md">
        Go Home
      </a>
    </div>
  )
}