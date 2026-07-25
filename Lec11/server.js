import http from 'http';
import fs from 'fs/promises';

const PORT = 3000;
const FILE_PATH = './players.json';

async function readPlayers() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writePlayers(players) {
  await fs.writeFile(FILE_PATH, JSON.stringify(players, null, 2));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  res.setHeader('Content-Type', 'application/json');

  if (pathname === '/about' && method === 'GET') {
    return res.end(JSON.stringify({ name: "Anano", hobby: "Coding" }));
  }

  if (pathname === '/players' && method === 'GET') {
    const players = await readPlayers();
    const nationQuery = parsedUrl.searchParams.get('nation')?.toLowerCase();

    if (nationQuery) {
      const filtered = players.filter(p => p.nation?.toLowerCase() === nationQuery);
      return res.end(JSON.stringify(filtered));
    }
    return res.end(JSON.stringify(players));
  }

  if (pathname === '/players' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const newPlayer = JSON.parse(body);
        if (!newPlayer.name || !newPlayer.nation) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: "name და nation აუცილებელია!" }));
        }
        const players = await readPlayers();
        newPlayer.id = players.length > 0 ? Math.max(...players.map(p => p.id)) + 1 : 1;
        players.push(newPlayer);
        await writePlayers(players);
        res.statusCode = 201;
        res.end(JSON.stringify(newPlayer));
      } catch {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "არასწორი JSON" }));
      }
    });
    return;
  }

  if (pathname.startsWith('/players/') && method === 'DELETE') {
    const idToDelete = parseInt(pathname.split('/')[2]);
    const players = await readPlayers();
    const filtered = players.filter(p => p.id !== idToDelete);
    await writePlayers(filtered);
    return res.end(JSON.stringify({ success: true }));
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log(`სერვერი ჩაირთო: http://localhost:${PORT}`);
});