import { Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export function apiPlugin(): Plugin {
  return {
    name: 'mapna-mission-control-api',
    configureServer(server) {
      server.middlewares.use('/api/council/query', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const { query, decisionPackage, lang } = parsed;

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 503;
              res.end(JSON.stringify({ error: 'API key not configured' }));
              return;
            }

            const ai = new GoogleGenAI({ apiKey });

            const systemPrompt = `
You are the Executive Council of MAPNA Pars Generator (شرکت مهندسی و ساخت ژنراتور مپنا - پارس), the leading manufacturer of heavy utility turbogenerators (160MW MGT-70, 324MW Class F) in Iran.
You operate as an AI executive advisor inside "Mission Control v1.0", a Decision Intelligence platform.

Current Golden Scenario context:
- Disrupted Machine: PAMA Speedram 2000 CNC Heavy Boring & Milling Machine (WC-MCH-BORING01)
- Cause: Main Spindle Hydraulic & high-speed bearings failure
- Disruption duration: 20 calendar days outage
- Affected Project: 160MW Hydrogen-cooled Turbogenerator for Jahrom/Boin Zahra Combined Cycle Power Plant (Client: TPPH)
- Daily contractual liquidated damages penalty: 450,000,000 IRR/day
- Delayed Milestone: Stator Stacking & VPI completion (42 Billion IRR billing milestone)
- Selected Best Alternative: Subcontracting 80-ton Stator Frame milling to Machine Sazi Arak (ماشین‌سازی اراک)
  - Direct cost: 3.4B IRR
  - Compresses project delay from 22 days to only 4 days
  - Avoided penalties: 8.1B IRR saved
  - Council Verdict: CONDITIONAL GO (conditional on resident QA inspector, laser tracker, CAR transit insurance, nocturnal road permit)

User language: ${lang === 'fa' ? 'Persian (Farsi)' : 'English'}
User Question: "${query}"

Respond as one of the council members (COO Eng. Kazemi, CFO Dr. Hosseini, Chief Engineer Dr. Rahimi, Devil's Advocate Eng. Ghasemi, or Council Chairman Dr. Taghipour).
Output strictly JSON matching this structure:
{
  "speaker": "Name of Speaker",
  "speakerRole": "Executive Role Title",
  "response": "Crisp, authoritative, expert answer grounded in the real engineering and economic facts of MAPNA Pars Generator and Iranian industrial reality (2-4 paragraphs).",
  "suggestedFollowUp": "A relevant follow-up question the user might want to ask",
  "groundedFacts": ["Fact 1", "Fact 2", "Fact 3"]
}
`;

            const modelName = 'gemini-2.5-flash';
            const response = await ai.models.generateContent({
              model: modelName,
              contents: systemPrompt,
              config: {
                responseMimeType: 'application/json'
              }
            });

            const text = response.text || '{}';
            res.setHeader('Content-Type', 'application/json');
            res.end(text);
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err?.message || 'Inference error' }));
          }
        });
      });
    }
  };
}
