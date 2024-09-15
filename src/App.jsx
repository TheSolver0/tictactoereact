import { useEffect, useState } from 'react'
import './App.css'
import { Case } from './components/Case'
import { ButtonHist } from './components/ButtonHist'

function App() {
  
  const [val, setVal] = useState(["_","_","_","_","_","_","_","_","_"]);
  const [next, setNext] = useState("X");
  const [hist, setHist] = useState(["1.Debut de la partie"]);
  const [i, setI] = useState(2);

  const handleCLick = e => {
   
    console.log(e);
    console.log(next);
    const newVal = [...val];
    if(newVal[e] === "_" )
    {
      newVal[e] = next; 
      setVal(newVal); 
      let actu = next === "X" ? "O" : "X";
      setNext(actu); 
      setHist([...hist, `${i}. Jeu de ${next} sur la case #${e+1}`]);
      setI(i => i+1)
    }
    console.log('hist: ',hist);

  }

  useEffect( () => {
    
    if(win(val))
      {
        swal({
          title: "Victoire 🎉!",
          text: (next === "X" ? "O" : "X") +" à remporté la partie !",
          // icon: "🎉",
          button: "Relancer!",
        }).then(
          (value) => setTimeout(location.reload(), 5000)
        );
        // alert();
        // setTimeout(location.reload(), 10000);
  
      }
    if(val.every(v => v!='_'))
    {
      swal({
        title: "Match Nul 😐!",
        text: " Plus aucun coup possible !",
        // icon: "😐",
        button: "Relancer!",
      }).then(
        (value) => setTimeout(location.reload(), 5000)
      );
    }
    // console.log(win(val));
    
  }, val); 

  return (
    <>
      <h2>Tic-Tac-Toe</h2>
      <br />
      <br />
    <div className='jeu'>
      <span>Next Player : {next}</span>
      <table>
        <tbody>
        <tr>
          <Case onClick={() => handleCLick(0)}  val={val[0]} />
          <Case onClick={() => handleCLick(1)} val={val[1]}/>
          <Case onClick={() => handleCLick(2)} val={val[2]} />
        </tr>
        <tr>
          <Case onClick={() => handleCLick(3)} val={val[3]}/>
          <Case onClick={() => handleCLick(4)} val={val[4]}/>
          <Case onClick={() => handleCLick(5)} val={val[5]}/>
        </tr>
        <tr>  
          <Case onClick={() => handleCLick(6)} val={val[6]}/>
          <Case onClick={() => handleCLick(7)} val={val[7]}/>
          <Case onClick={() => handleCLick(8)} val={val[8]}/>
        </tr>
        </tbody>
        
      </table>
      <div className="historique">
        {hist.map((h,i) => (
          <ButtonHist key={i}>{h}</ButtonHist>
        ))}
        
      </div>
    </div>
    </>
  )
}

function win(val)
{
  // (0,1,2)||(3,4,5)||(6,7,8) || (0,3,6)||(1,4,7)||(2,5,8) || (0,4,8)||(2,4,6)
  let start = val.every(v => v==="_");
  // let nul = val.every(v => v!="_");

  
  if(start) return false;
  else
  {
    if( val[0]===val[1] && val[1]===val[2] && val[1] != "_" || 
        val[3]===val[4] && val[4]===val[5] && val[4] != "_" ||
        val[6]===val[7] && val[7]===val[8] && val[7] != "_" ||
        val[0]===val[3] && val[3]===val[6] && val[3] != "_" ||
        val[1]===val[4] && val[4]===val[7] && val[4] != "_" ||
        val[2]===val[5] && val[5]===val[8] && val[5] != "_" ||
        val[0]===val[4] && val[4]===val[8] && val[4] != "_" ||
        val[2]===val[4] && val[4]===val[6] && val[4] != "_")
      return true;
  return false

  }
  
  
}

export default App
