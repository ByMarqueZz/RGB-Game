import './App.css'
import './animations.css'
import React from 'react';

export default function App() {
  const [rgb, setRgb] = React.useState<string[]>(['0', '0', '0']);
  const [randomNumber, setRandomNumber] = React.useState<number>(0);

  React.useEffect(() => {
    playGame();
  }, []);

  function handleTryToGuess(i: number) {
    const rgb2 = document.getElementsByClassName('rgb')[0] as HTMLElement;
    const text = document.getElementsByClassName('text')[0] as HTMLElement;
    const button = document.getElementsByClassName('reload')[0] as HTMLElement;
    if (i === randomNumber) {
      rgb2.classList.add('vibrate-1');
      rgb2.classList.add('win');
      rgb2.style.backgroundColor = `rgb(${rgb.join(', ')})`;
      text.innerText = "Correcto!"
      button.style.display = "block";
    } else {
      rgb2.classList.add('vibrate-1');
      rgb2.classList.add('error');
      text.innerText = "Error"
      setTimeout(() => {
        rgb2.classList.remove('vibrate-1');
        rgb2.classList.remove('error');
        text.innerHTML = `rgb(${rgb.join(', ')}) <span className='background-text'>?</span>`
      }, 700);
    }
  }

  function handleClickHelp() {
    const modalElement = document.getElementsByClassName('modal')[0] as HTMLElement;
    if (modalElement.style.display === 'block') {
      handleClickOut();
      return;
    }
    modalElement.style.display = 'block';
    modalElement.classList.add('slide-in-top');

  }

  function handleClickOut() {
    const modalElement = document.getElementsByClassName('modal')[0] as HTMLElement;
    modalElement.classList.remove('slide-in-top');
    modalElement.classList.add('slide-out-top');
    setTimeout(() => {
      modalElement.style.display = 'none';
      modalElement.classList.remove('slide-out-top');
    }, 500);
  }

  function randomRgb() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return [r.toString(), g.toString(), b.toString()];
  }

  function playGame() {
    setRgb(randomRgb());
    setRandomNumber(Math.floor(Math.random() * 6));
  }

  function reloadGame() {
    const rgb2 = document.getElementsByClassName('rgb')[0] as HTMLElement;
    const button = document.getElementsByClassName('reload')[0] as HTMLElement;
    const text = document.getElementsByClassName('text')[0] as HTMLElement;
    rgb2.classList.remove('win')
    rgb2.classList.remove('vibrate-1');
    rgb2.style.background = `linear-gradient(to right, #eee 8%, #ddd 18%, #eee 33%);`
    button.style.display = "none"
    playGame()
    text.innerHTML = `rgb(${rgb.join(', ')}) <span className='background-text'>?</span>`
  }

  return (
    <>
      <div className='modal'>
        <span onClick={handleClickOut}>&times;</span>
        <h2 className='text-shadow-drop-center'>¿Cómo jugar?</h2>
        <p>Tienes que averiguar a que color se corresponde el código rgb(X,X,X) que sale arriba</p>
        <p>El primer valor es el rojo, el segundo el verde y el tercero el azul</p>
        <p>El valor de cada color va de mínimo 0 a máximo 255</p>
        <p>Tienes que mezclar los colores en tu mente y averiguar que color es el del código</p>
        <p>Si es 127, 255, 0 tienes que mezclar mitad de rojo, todo el verde y nada de azul. Que saldría verde clarito</p>
      </div>
      <header>
        <h1 className='text-shadow-drop-center'>Adivina el color</h1>
        <img src='help.png' alt='help' onClick={handleClickHelp} />
        <div className='rgb'>
          <span className='text'>
            rgb({rgb.join(', ')})
            <span className='background-text'>?</span>
          </span>
        </div>
        <div className='buttonDiv'>
          <button className='reload' onClick={reloadGame}>Empezar de nuevo</button>
        </div>
      </header>
      <div className='colors'>
        {
          Array.from({ length: 6 }, (_, i) => {
            const color = randomRgb();
            return (
              <div key={i} className='color' style={i == randomNumber ? { backgroundColor: `rgb(${rgb.join(', ')})` } : { backgroundColor: `rgb(${color.join(', ')})` }} onClick={() => {
                handleTryToGuess(i);
              }}></div>
            )
          })
        }
      </div>
    </>
  )
}
