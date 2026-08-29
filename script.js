
  const clock = document.getElementById('clock');
  for (let i = 0; i < 60; i++) {
      const tick = document.createElement('div');
      tick.className = 'tick' + (i % 5 === 0 ? ' major' : '');
      tick.style.transform = `translate(-50%, 0) rotate(${i * 6}deg)`;
      clock.appendChild(tick);
  }


  let totalSeconds = 0; // tempo decorrido
  let intervalId = null; // guarda o retorno do setInterval p/ poder cancelar

  const digitalEl = document.getElementById('digital');
  const handHours = document.getElementById('hand-hours');
  const handMinutes = document.getElementById('hand-minutes');
  const handSeconds = document.getElementById('hand-seconds');

  
  function render() {
      const horas = Math.floor(totalSeconds / 3600) % 24;
      const minutos = Math.floor(totalSeconds / 60) % 60;
      const segundos = totalSeconds % 60;


      const pad = n => String(n).padStart(2, '0');
      digitalEl.textContent = `${pad(horas)}:${pad(minutos)}:${pad(segundos)}`;

      const anguloSegundos = (segundos / 60) * 360;

      const anguloMinutos = (minutos / 60) * 360 + (segundos / 60) * 6;

    
      const anguloHoras = ((horas % 12) / 12) * 360 + (minutos / 60) * 30;

      handSeconds.style.transform = `rotate(${anguloSegundos}deg)`;
      handMinutes.style.transform = `rotate(${anguloMinutos}deg)`;
      handHours.style.transform = `rotate(${anguloHoras}deg)`;
  }


  function start() {
      if (intervalId !== null) return; 
      intervalId = setInterval(() => {
          totalSeconds++;
          render();
      }, 1000); // droda a cada 1000ms = 1 segundo
  }

  function pause() {
      clearInterval(intervalId); 
      intervalId = null;
  }

  function reset() {
      pause();
      totalSeconds = 0;
      render();
  }

  document.getElementById('btn-start').addEventListener('click', start);
  document.getElementById('btn-pause').addEventListener('click', pause);
  document.getElementById('btn-reset').addEventListener('click', reset);

  render(); // zera p o estado inicial (00:00:00)