import express, { Request, Response } from 'express';
import { client } from '../data/DB';

const router = express.Router();

router.post('/analytics/events', async (req:Request,res:Response) => {
  const { eventName, sessionId, pageUrl, productId, categoryId, metadata } = req.body || {};
  if(!eventName || !sessionId) return res.status(400).json({error:'eventName and sessionId are required'});
  try {
    await client.query(
      `INSERT INTO analytics_events (session_id,event_name,page_url,product_id,category_id,metadata)
       VALUES ($1,$2,$3,$4,$5,$6)`,
      [sessionId,eventName,pageUrl || null,productId || null,categoryId || null,metadata || {}]
    );
    res.status(201).json({stored:true});
  } catch (error:any) {
    // The storefront remains usable when the optional analytics migration has not been applied.
    if(error?.code === '42P01') return res.status(202).json({stored:false, reason:'analytics table not installed'});
    console.error('Analytics event error:', error?.message || error);
    res.status(500).json({stored:false});
  }
});

router.get('/analytics/summary', async (_req:Request,res:Response) => {
  try {
    const events = await client.query(`SELECT event_name, COUNT(*)::int AS events, COUNT(DISTINCT session_id)::int AS sessions FROM analytics_events GROUP BY event_name ORDER BY events DESC`);
    res.status(200).json({data:events.rows});
  } catch (error:any) {
    if(error?.code === '42P01') return res.status(200).json({data:[], mode:'demo'});
    res.sendStatus(500);
  }
});

export default router;
