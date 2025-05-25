export default function Assistant() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
        <p className="text-muted-foreground">
          Get intelligent insights about fragrances and perfumes
        </p>
      </div>
      
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Chat with AI</h3>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-muted">
            <p className="text-sm">
              Hello! I&apos;m your AI assistant for fragrance analysis. You can ask me about:
            </p>
            <ul className="mt-2 text-sm list-disc list-inside space-y-1">
              <li>Fragrance note analysis</li>
              <li>Perfume recommendations</li>
              <li>Scent comparisons</li>
              <li>Seasonal suggestions</li>
            </ul>
          </div>
          
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Ask me about any fragrance..." 
              className="flex-1 p-2 border rounded-md"
            />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}