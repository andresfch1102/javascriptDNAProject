// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};
//console.log(returnRandBase());
//console.log(mockUpStrand());

const pAequorFactory = (num, baseArr) =>{
  return {
    specimenNum: num,
    dna: baseArr,

    mutate(){
      let random = Math.floor(Math.random()*15);
      let newBase = returnRandBase();
      /*console.log(random);
      console.log(this.dna[random]);
      console.log(newBase);*/
      if(this.dna[random] !== newBase){
        this.dna[random] = newBase;
      }else{
          while (this.dna[random] === newBase){
            let newBase2 = returnRandBase();
            //console.log('newBase2: ' + newBase2);
            this.dna[random] = newBase2;
        }
      }
      return this.dna;
    },

    compareDNA(obj){
      //console.log(this.dna);
      //console.log(obj.dna);
      let occurrences = 0;
      for(let i=0; i<obj.dna.length; i++){
        if(obj.dna[i] === this.dna[i]){
          occurrences++;
        }
      }
      //console.log(occurrences);
      let dnaInCommon = (occurrences/15)*100;
      console.log(`specimen #${this.specimenNum} and specimen #${obj.specimenNum} have ${dnaInCommon}% DNA in common`);
    },

    willLikelySurvive(){
      let survIndex = .6;
      let occurCorG = 0;
      for(let i=0; i<this.dna.length; i++){
        if(this.dna[i] === 'C' || this.dna[i] === 'G'){
          occurCorG++;
        }
      }
      return occurCorG/this.dna.length >= survIndex;
    },

    complementStrand(){
      const complementArr = [];
      for(let i=0; i<this.dna.length; i++){
        switch (this.dna[i]){
          case 'A':
            complementArr.push('T');
            break;
          case 'T':
            complementArr.push('A');
            break;
          case 'C':
            complementArr.push('G');
            break;
          case 'G':
            complementArr.push('C');
            break;
        }
      }
      return complementArr;
    },

  }
}

const pAequorInstances = ()=>{
  let survDnaArr = [];
  let instances = 0;
  let survNum = 1; 
  while(instances < 30){
    survNum++;
    let arrInst = pAequorFactory(survNum, mockUpStrand());
    if(arrInst.willLikelySurvive()){
      survDnaArr.push(arrInst.dna);
      instances++;
    }
  }
  return survDnaArr;
}

let arrayOfSurvDna = pAequorInstances();
//console.log(arrayOfSurvDna);

let example1 = pAequorFactory(1, mockUpStrand());
console.log(example1.dna);
console.log(example1.complementStrand());









