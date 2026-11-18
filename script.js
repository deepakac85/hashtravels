(() => {
  'use strict';
  const hero=document.querySelector('.hero');
  const heroImages=[...hero.querySelectorAll('.hero-image')];
  const heroLocations=[['Alleppey, Kerala','The art of slowing down'],['Kashmir','Lakes, valleys & a change of pace'],['Himalayas, Himachal Pradesh','A little closer to the clouds'],['Ladakh','Big skies. Bigger perspectives.'],['Rajasthan','Stories in every stone'],['Goa','Find your coastal rhythm']];
  const heroPause=document.getElementById('hero-pause');
  const heroMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let heroIndex=0,heroPaused=heroMotion.matches;
  function updateHeroPause(){heroPause.textContent=heroPaused?'▷':'Ⅱ';heroPause.setAttribute('aria-label',heroPaused?'Play landing slideshow':'Pause landing slideshow');}
  function showHero(index){
    const next=(index+heroImages.length)%heroImages.length;
    if(!heroImages[next].complete||!heroImages[next].naturalWidth)return;
    heroIndex=next;
    heroImages.forEach((img,i)=>{img.classList.toggle('is-active',i===heroIndex);img.setAttribute('aria-hidden',String(i!==heroIndex));});
    document.getElementById('hero-location').textContent=heroLocations[heroIndex][0];
    document.getElementById('hero-caption').textContent=heroLocations[heroIndex][1];
    document.getElementById('hero-count').textContent=String(heroIndex+1).padStart(2,'0')+' / '+String(heroImages.length).padStart(2,'0');
  }
  document.getElementById('hero-prev').addEventListener('click',()=>showHero(heroIndex-1));
  document.getElementById('hero-next').addEventListener('click',()=>showHero(heroIndex+1));
  heroPause.addEventListener('click',()=>{heroPaused=!heroPaused;updateHeroPause();});
  heroMotion.addEventListener('change',()=>{heroPaused=heroMotion.matches;updateHeroPause();});
  setInterval(()=>{const r=hero.getBoundingClientRect();if(!heroPaused&&!document.hidden&&!hero.contains(document.activeElement)&&!document.querySelector('dialog[open]')&&r.bottom>0&&r.top<innerHeight)showHero(heroIndex+1);},4000);
  updateHeroPause();
  const helpLauncher=document.getElementById('help-launcher');
  const helpPanel=document.getElementById('help-panel');
  const helpClose=document.getElementById('help-close');
  const helpAnswer=document.getElementById('help-answer');
  function setHelp(open,restoreFocus=false){
    helpPanel.hidden=!open;
    document.getElementById('whatsapp-launcher').hidden=open;
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
      p.textContent='Explore Kerala, Kashmir, the Himalayas, Ladakh, Rajasthan, Goa, Andaman, Karnataka, and more. Use the destination filters to find your kind of trip.';helpAnswer.append(p);addLink('Explore destinations →','#destinations');
    }else{
      p.textContent='For bookings, pricing, or help with an existing trip, contact the Hash Travels team directly.';helpAnswer.append(p);addLink('Chat on WhatsApp','https://wa.me/919148049119?text=Hello%20Hash%20Travels%2C%20I%20would%20like%20help%20planning%20a%20trip.');addLink('Email support@hashtravels.com','mailto:support@hashtravels.com');addLink('Call +91 91480 49119','tel:+919148049119');
    }
  }));
  const cards=[...document.querySelectorAll('.destination-card')];
  const filters=[...document.querySelectorAll('[data-filter]')];
  const track=document.getElementById('destination-track');
  const carousel=document.querySelector('.destination-carousel');
  const pauseSlides=document.getElementById('carousel-pause');
  const prevSlides=document.getElementById('carousel-prev');
  const nextSlides=document.getElementById('carousel-next');
  const positionLabel=document.getElementById('carousel-position');
  const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
  let slidesPaused=reducedMotion.matches,slideIndex=0,hovered=false,scrollTimer;
  function slidePositions(){
    const visible=cards.filter(card=>!card.hidden);
    if(!visible.length)return [0];
    const max=Math.max(0,track.scrollWidth-track.clientWidth);
    return [...new Set(visible.map(card=>Math.round(Math.min(max,card.offsetLeft-visible[0].offsetLeft))))];
  }
  function updateSlideControls(){
    const positions=slidePositions();
    slideIndex=positions.reduce((best,p,i)=>Math.abs(p-track.scrollLeft)<Math.abs(positions[best]-track.scrollLeft)?i:best,0);
    positionLabel.textContent=(slideIndex+1)+' / '+positions.length;
    prevSlides.disabled=nextSlides.disabled=positions.length<2;
    pauseSlides.disabled=positions.length<2;
    pauseSlides.textContent=slidesPaused?'Play slideshow':'Pause slideshow';
  }
  function advanceSlide(direction){
    const positions=slidePositions();
    slideIndex=(slideIndex+direction+positions.length)%positions.length;
    track.scrollTo({left:positions[slideIndex],behavior:reducedMotion.matches?'instant':'smooth'});
    positionLabel.textContent=(slideIndex+1)+' / '+positions.length;
  }
  prevSlides.addEventListener('click',()=>advanceSlide(-1));
  nextSlides.addEventListener('click',()=>advanceSlide(1));
  pauseSlides.addEventListener('click',()=>{slidesPaused=!slidesPaused;updateSlideControls();});
  track.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(updateSlideControls,120);},{passive:true});
  track.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')hovered=true;});
  track.addEventListener('pointerleave',()=>{hovered=false;});
  setInterval(()=>{
    const rect=track.getBoundingClientRect();
    if(!slidesPaused&&!hovered&&!document.hidden&&!carousel.contains(document.activeElement)&&!document.querySelector('dialog[open]')&&rect.top<innerHeight&&rect.bottom>0)advanceSlide(1);
  },4000);
  reducedMotion.addEventListener('change',()=>{slidesPaused=reducedMotion.matches;updateSlideControls();});
  new ResizeObserver(updateSlideControls).observe(track);
  updateSlideControls();

  filters.forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.filter;let count=0;
    filters.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    cards.forEach(card=>{card.hidden=value!=='all'&&!card.dataset.category.split(' ').includes(value);if(!card.hidden)count++;});
    document.getElementById('result-count').textContent=count+(count===1?' way':' ways')+' to get away';
    track.scrollTo({left:0,behavior:'instant'});slideIndex=0;updateSlideControls();
  }));
  const trips={
    "Kashmir":{"intro": "Shape a Kashmir journey around lakeside moments, valley scenery, and a comfortable pace.", "points": ["Begin with time to explore Srinagar and Dal Lake.", "Discuss valley excursions around your dates and interests.", "Confirm local conditions and travel arrangements with the team."]},
    "Himalayas":{"intro": "A Himalayan escape in Himachal Pradesh, shaped around mountain scenery and time outdoors.", "points": ["Choose your preferred hill towns and starting city.", "Balance scenic drives with relaxed walks and local experiences.", "Confirm the route, weather conditions, and travel time before booking."]},
    "Ladakh":{"intro": "Discover the high-altitude landscapes of Ladakh through a carefully paced journey.", "points": ["Allow time to acclimatise in Leh.", "Discuss suitable routes, lakes, and cultural stops with the team.", "Confirm permits, local conditions, and altitude considerations before travel."]},
    "Rajasthan":{"intro": "Create a Rajasthan journey through historic cities, palace architecture, and local traditions.", "points": ["Start with a city shortlist such as Jaipur, Jodhpur, or Udaipur.", "Mix heritage visits with markets, food, and time to explore.", "Plan comfortable travel times between your chosen stops."]},
    "Goa":{"intro": "Build your Goa escape around the coast, local flavours, and the pace that feels right.", "points": ["Choose a lively base or a quieter coastal stay.", "Make time for heritage neighbourhoods and local food.", "Keep a day open for the beach and a little spontaneity."]},

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
    const whatsappMessage='Hello Hash Travels,\n\nI would like help planning a trip.\nDestination: '+name+'\n'+(details||'Travel dates and group: to be discussed.')+'\n\nPlease help me with an itinerary and quote. Thank you!';
    document.getElementById('whatsapp-enquiry').href='https://wa.me/919148049119?text='+encodeURIComponent(whatsappMessage);
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
