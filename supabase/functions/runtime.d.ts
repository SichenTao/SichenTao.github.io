// Minimal globals for the repository-wide TypeScript pass. Hosted Supabase Edge Functions
// and `deno check` use Deno's complete built-in declarations.
declare namespace Deno {
  const env: {
    get(name: string): string | undefined;
  };

  function serve(handler: (request: Request) => Response | Promise<Response>): {
    finished: Promise<void>;
    shutdown(): Promise<void>;
  };
}
