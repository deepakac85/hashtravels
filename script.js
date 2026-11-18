(() => {
  'use strict';
  const helpLauncher=document.getElementById('help-launcher');
  const helpPanel=document.getElementById('help-panel');
  const helpClose=document.getElementById('help-close');
  const helpAnswer=document.getElementById('help-answer');
  function setHelp(open,restoreFocus=false){
    helpPanel.hidden=!open;
    helpLauncher.setAttribute('aria-expanded',String(open));
    helpLauncher.setAttribute('aria-label',open?'Close travel help':'Open travel help');
    if(open)helpClose.focus();else if(restoreFocus)helpLauncher.focus();
  }
  helpLauncher.addEventListener('click',()=>setHelp(helpPanel.hidden));
  helpClose.addEventListener('click',()=>setHelp(false,true));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!helpPanel.hidden){setHelp(false,helpPanel.contains(document.activeElement));}});
  document.addEventListener('click',event=>{if(!helpPanel.hidden&&!helpPanel.contains(event.target)&&!helpLauncher.contains(event.target))setHelp(false);});
  document.querySelectorAll('[data-help]').forEach(button=>button.addEventListener('click',()=>{
    const topic=button.dataset.help;
    helpAnswer.replaceChildren();
    const p=document.createElement('p');
    const addLink=(label,url)=>{const a=document.createElement('a');a.textContent=label;a.href=url;if(url.startsWith('#'))a.addEventListener('click',()=>setHelp(false));helpAnswer.append(a);};
    if(topic==='plan'){
      p.textContent='Start with a destination, travel month, and who’s coming. Our trip planner will put together a sample starting point for your enquiry.';helpAnswer.append(p);addLink('Open the trip planner →','#planner');
    }else if(topic==='destinations'){
      p.textContent='Explore Kerala, Andaman, Karnataka, North India, one-day tours, and seasonal escapes. Use the destination filters to find your kind of trip.';helpAnswer.append(p);addLink('Explore destinations →','#destinations');
    }else{
      p.textContent='For bookings, pricing, or help with an existing trip, contact the Hash Travels team directly.';helpAnswer.append(p);addLink('Email support@hashtravels.com','mailto:support@hashtravels.com');addLink('Call +91 91480 49119','tel:+919148049119');
    }
  }));
  const cards=[...document.querySelectorAll('.destination-card')];
  const filters=[...document.querySelectorAll('[data-filter]')];
  filters.forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.filter;let count=0;
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    cards.forEach(card=>{card.hidden=value!=='all'&&!card.dataset.category.split(' ').includes(value);if(!card.hidden)count++;});
    document.getElementById('result-count').textContent=count+(count===1?' way':' ways')+' to get away';
  }));
  const trips={
    'Kerala':{intro:'Slow down among the backwaters, tea-covered hills, and coastal flavours of Kerala.',points:['Begin with Kochi’s heritage neighbourhoods.','Head into the hills around Munnar.','Finish with an unhurried backwater experience.']},
    'Andaman':{intro:'Build an island escape around clear water, beach time, and the pace that suits you.',points:['Start in Port Blair with time to settle in.','Explore island beaches and coastal experiences.','Leave room for a relaxed day by the sea.']},
    'Karnataka':{intro:'Blend coffee country, heritage, and nature into your own Karnataka getaway.',points:['Choose between hill-country calm and heritage discovery.','Make time for local food and a scenic detour.','Shape the route around your starting city and travel dates.']},
    'North India':{intro:'Create a journey through history, spiritual places, and changing landscapes.',points:['Pick the cities or pilgrimage stops that matter to you.','Balance sightseeing with time to explore at your own pace.','Work with the team on the route and travel arrangements.']},
    'One-day escape':{intro:'A change of scene can be closer than you think. Plan a short break around your city.',points:['Share your starting city.','Choose a nature, heritage, or relaxed sightseeing day.','Keep the itinerary light and the travel time comfortable.']},
    'Seasonal escapes':{intro:'Let the season inspire a journey, then shape the details around your interests.',points:['Tell the team when you would like to travel.','Explore destinations suited to that time of year.','Confirm local conditions and availability before booking.']},
    'Surprise me':{intro:'No destination yet? Start with the kind of feeling you want to come home with.',points:['Choose coast, nature, culture, or a little of everything.','Share your dates, starting city, and preferred pace.','Discuss a shortlist with the Hash Travels team.']}
  };
  const dialog=document.getElementById('trip-dialog');
  const month=document.getElementById('travel-month');
  const now=new Date();month.min=now.getFullYear()+'-'+String(now.getMonth()+1).padStart(2,'0');
  function showTrip(name,details='') {
    const trip=trips[name]||trips['Surprise me'];
    document.getElementById('dialog-title').textContent=name==='Surprise me'?'Your kind of escape':name;
    document.getElementById('dialog-description').textContent=trip.intro+(details?' '+details:'');
    const list=document.getElementById('trip-points');list.replaceChildren();
    trip.points.forEach(point=>{const li=document.createElement('li');li.textContent=point;list.append(li);});
    const body='Hello Hash Travels,\n\nI would like to discuss a personalised trip to '+name+'.\n'+details+'\n\nMy starting city: \nPreferred duration: \nApproximate budget: \n\nThank you.';
    document.getElementById('email-enquiry').href='mailto:support@hashtravels.com?subject='+encodeURIComponent('Trip enquiry: '+name)+'&body='+encodeURIComponent(body);
    dialog.showModal();
  }
  document.querySelectorAll('[data-trip]').forEach(button=>button.addEventListener('click',()=>showTrip(button.dataset.trip)));
  document.getElementById('trip-form').addEventListener('submit',event=>{
    event.preventDefault();let when='Dates are flexible.';
    if(month.value){const [year,m]=month.value.split('-').map(Number);when='Travel month: '+new Date(year,m-1,1).toLocaleDateString('en',{month:'long',year:'numeric'})+'.';}
    showTrip(document.getElementById('destination').value,when+' Travelling '+document.getElementById('group').value.toLowerCase()+'.');
  });
  document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
})();
