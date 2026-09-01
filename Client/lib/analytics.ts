export type ShopSenseEvent = {
  eventName: string;
  productId?: number;
  categoryId?: number;
  metadata?: Record<string, unknown>;
};

function sessionId(){
  if (typeof window === 'undefined') return 'server';
  const key='shopsense_session_id';
  let value=sessionStorage.getItem(key);
  if(!value){ value=`ss_${Date.now()}_${Math.random().toString(36).slice(2,8)}`; sessionStorage.setItem(key,value); }
  return value;
}

export async function trackEvent(event: ShopSenseEvent){
  if(typeof window === 'undefined') return;
  const payload={...event, sessionId:sessionId(), pageUrl:window.location.pathname};
  try{
    const history=JSON.parse(localStorage.getItem('shopsense_events') || '[]');
    localStorage.setItem('shopsense_events', JSON.stringify([...history.slice(-199), {...payload, createdAt:new Date().toISOString()}]));
  }catch{}
  try{
    await fetch('/api/analytics-event', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload), keepalive:true});
  }catch{}
}
