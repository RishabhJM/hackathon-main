// /* eslint-disable prefer-const */
// /* eslint-disable @typescript-eslint/no-unused-vars */

// import { CellState } from './cell-state.model';

// export interface ISimulatorNode {
//   OnStep(request: any);
// }

// export class SimulatorNode implements ISimulatorNode {
//   m_random(MIN_NUMBER, MAX_NUMBER) {
//     return (
//       Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER
//     );
//   }
//   queue = [];

//   constructor() {
//     const startX = 48;
//     const startY = 48;
//     this.queue.push({ x: startX, y: startY });
//   }
//   m_stepCount = 0;
//   private m_money = 0;
//   private m_width = 0;
//   private m_height = 0;
//   private m_X = 48;
//   private m_Y = 48;
//   private m_index = -1;
//   private m_round = -1;
//   public x = 4;
//   private first = true;

//   // Not great variables for randonm strategy....
//   private m_buyIndex = -1;

//   // Something to store some cell infromation if you think this will be useful
//   private static m_cells: CellState[][] = [];
//   public visited = new Array(96).fill(false).map(() => new Array(96).fill(false));


//   // Enqueue the starting cell

//   OnStep(request: any) {
//     let result = '';

//     try {
//       //
//       // Step management. Update status absed on provided parameters from Master
//       //
//       this.m_stepCount++;
//       let lastoperation = '';
//       let lastoperationstatus = false;

//       try {
//         const operation = this.ParseInput(request, {
//           lastoperation,
//           lastoperationstatus,
//         });
//         lastoperation = operation.lastoperation;
//         lastoperationstatus = operation.lastoperationstatus;
//       } catch (e) {
//         result += '<BR>Excep[tion while retreiving client information ' + e;
//         return result;
//       }

//       // Maybe create a store to save the cell infromation if you plan on using it....
//       //
//       // Look at the current production
//       //
//       const production: string = request['production'];
//       console.log(production);
//       if (production != null) {
//         const listOfCellProduction: string[] = production.split(' ');
//         const countOfProducingCells: number = listOfCellProduction.length;

//         for (let i = 0; i < countOfProducingCells; i++) {
//           const prodinfo: string[] = listOfCellProduction[i].split(',');
//           if (prodinfo.length < 3) continue;

//           let x: number = parseInt(prodinfo[0]);
//           let y: number = parseInt(prodinfo[1]);
//           let p: number = parseInt(prodinfo[2]);

//           // Looks like useful information, maybe we should do something with this?
//         }
//       }
//       // Your code for each condition goes here
//       if (this.x == 4) {
//         // Buy buy buy!
//         const currentCell = this.queue[0];
//         const currentX = currentCell.x;
//         const currentY = currentCell.y;
//         this.m_X = currentX;
//         this.m_Y = currentY;
//         result += this.TryToPurchaseAt(this.m_X, this.m_Y);
//         // this.m_buyIndex = this.m_stepCount;
//         this.x--;
//       } else if (this.x == 3) {
//         // Blindly try to drill
//         result += this.TryToExploreAt(this.m_X, this.m_Y, true);
//         this.x--;

//       }
//       else if (this.x == 2) {
//         // Blindly try to drill
//         result += this.TryToDrillAt(this.m_X, this.m_Y, true);
//         this.x--;

//       } else if (this.x == 1) {
//         // Blindly try to stimulate
//         result += this.TryToStimulateAt(this.m_X, this.m_Y, true);
//         this.x--;

//       } else {
//         // Buy buy buy!
//         this.x = 4;
//         while (this.queue.length > 0) {
//           // Check if the current cell is visited
//           if (this.visited[this.m_X][this.m_Y]) {
//             continue;
//           }
//           // Mark the current cell as visited
//           this.visited[this.m_X][this.m_Y] = true;
//           // Enqueue the surrounding cells (considering all 8 surrounding points)
//           const dx = [-1, -1, -1, 0, 0, 1, 1, 1];
//           const dy = [-1, 0, 1, -1, 1, -1, 0, 1];
//           for (let i = 0; i < 8; i++) {
//             const newX = this.m_X + dx[i];
//             const newY = this.m_X + dy[i];
//             // Check if the new coordinates are within the grid boundaries
//             if (newX >= 0 && newX < 96 && newY >= 0 && newY < 96) {
//               // Enqueue the unvisited cell
//               if (!this.visited[newX][newY]) {
//                 this.queue.push({ x: newX, y: newY });
//               }
//             }
//           }
//         }
//         this.queue.shift();
//       }

//       // Now what should I do
//       // You can probably do better than this random strategy......
//       if (this.m_buyIndex == -1) {
//         // Buy buy buy!
//         this.m_X = this.m_random(0, this.m_width);
//         this.m_Y = this.m_random(0, this.m_height);
//         result += this.TryToPurchaseAt(this.m_X, this.m_Y);
//         this.m_buyIndex = this.m_stepCount;
//       } else if (this.m_buyIndex == this.m_stepCount - 1) {
//         // Blindly try to drill
//         result += this.TryToDrillAt(this.m_X, this.m_Y, true);
//       } else if (this.m_buyIndex == this.m_stepCount - 2) {
//         // Blindly try to stimulate
//         result += this.TryToStimulateAt(this.m_X, this.m_Y, true);
//       } else if (this.m_buyIndex == this.m_stepCount - 3) {
//         // Buy buy buy!
//         this.m_X = this.m_random(0, this.m_width);
//         this.m_Y = this.m_random(0, this.m_height);
//         result += this.TryToPurchaseAt(this.m_X, this.m_Y);
//         this.m_buyIndex = this.m_stepCount;
//       }
//     } catch (e) {
//       result += '<BR>Exception while handling request ' + e;
//     }

//     return result;
//   }

//   private ParseInput(
//     request: any,
//     operation: { lastoperation: string; lastoperationstatus: boolean }
//   ) {
//     for (const s in request) {
//       switch (s) {
//         case 'round':
//           this.m_round = parseInt(request[s]);
//           if (this.m_round == 0) {
//             SimulatorNode.m_cells = null;
//             this.m_width = 0;
//             this.m_height = 0;
//           }
//           break;
//         case 'money':
//           this.m_money = parseInt(request[s]);
//           break;
//         case 'width':
//           this.m_width = parseInt(request[s]);
//           break;
//         case 'height':
//           this.m_height = parseInt(request[s]);
//           break;
//         case 'lastoperation':
//           operation.lastoperation = request[s];
//           break;
//         case 'lastoperationstatus':
//           operation.lastoperationstatus = request[s] == 'True';
//           break;
//         case 'index':
//           this.m_index = parseInt(request[s]);
//           break;
//       }
//     }
//     return operation;
//   }

//   private TryToPurchaseAt(x: number, y: number): string {
//     let result = '';
//     result += '<Execute>Buy</Execute>';
//     result += '<BuyAtX>' + x + '</BuyAtX>';
//     result += '<BuyAtY>' + y + '</BuyAtY>';
//     return result;
//   }
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   private ConfirmPurchaseAt(x: number, y: number): string {
//     let result = '';
//     // Capture we have bought at X/Y (previous round)
//     if (!SimulatorNode.m_cells[this.m_X][this.m_Y]) {
//       SimulatorNode.m_cells[this.m_X][this.m_Y] = new CellState(
//         this.m_X,
//         this.m_Y
//       );
//     }

//     SimulatorNode.m_cells[this.m_X][this.m_Y].MarkAsPurchased();
//     result += '<HR>Purchased ' + this.m_X + ' ' + this.m_Y;
//     return result;
//   }

//   private StopProduction(x: number, y: number): string {
//     let result = '';
//     result +=
//       '<Execute>StopProduction</Execute><StopProductionAtX>' +
//       x +
//       '</StopProductionAtX><StopProductionAtY>' +
//       y +
//       '</StopProductionAtY>';
//     return result;
//   }

//   private TryToExploreAt(x: number, y: number, slb: boolean): string {
//     let result = '';
//     result += '<Execute>Explore</Execute>';
//     result += '<ExploreAtX>' + x + '</ExploreAtX>';
//     result += '<ExploreAtY>' + y + '</ExploreAtY>';
//     result += '<ServiceProvider>';
//     if (slb) {
//       result += 'SLB';
//     } else {
//       result += 'HAL';
//     }
//     result += '</ServiceProvider>';
//     return result;
//   }
//   private TryToDrillAt(x: number, y: number, slb: boolean): string {
//     let result = '';
//     result += '<Execute>Drill</Execute>';
//     result += '<DrillAtX>' + x + '</DrillAtX>';
//     result += '<DrillAtY>' + y + '</DrillAtY>';
//     result += '<ServiceProvider>';
//     if (slb) {
//       result += 'SLB';
//     } else {
//       result += 'HAL';
//     }
//     result += '</ServiceProvider>';
//     return result;
//   }
//   private TryToStimulateAt(x: number, y: number, slb: boolean): string {
//     let result = '';
//     result += '<Execute>Stimulate</Execute>';
//     result += '<StimulateAtX>' + x + '</StimulateAtX>';
//     result += '<StimulateAtY>' + y + '</StimulateAtY>';
//     result += '<ServiceProvider>';
//     if (slb) {
//       result += 'SLB';
//     } else {
//       result += 'HAL';
//     }
//     result += '</ServiceProvider>';
//     return result;
//   }
// }


/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { CellState } from './cell-state.model';

export interface ISimulatorNode {
  OnStep(request: any);
}

export class SimulatorNode implements ISimulatorNode {
  m_random(MIN_NUMBER, MAX_NUMBER) {
    return (
      Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER
    );
  }

  m_stepCount = 0;
  private m_money = 0;
  private m_width = 0;
  private m_height = 0;
  private m_X = 0;
  private m_Y = 0;
  private m_index = -1;
  private m_round = -1;

  private first = true;

  // Not great variables for randonm strategy....
  private m_buyIndex = -1;

  // Something to store some cell infromation if you think this will be useful
  private static m_cells: CellState[][] = [];
  public cellStore:{x:number,y:number}[] = [];
  public first1:boolean = true;
  public zero:boolean = false;
  public max_money = 0;
  private i=0;
  private ogX=0;
  private ogY=0;
  OnStep(request: any) {
    let result = '';

    try {
      //
      // Step management. Update status absed on provided parameters from Master
      //
      this.m_stepCount++;
      let lastoperation = '';
      let lastoperationstatus = false;
      this.max_money = Math.max(this.max_money,this.m_money);
      try {
        const operation = this.ParseInput(request, {
          lastoperation,
          lastoperationstatus,
        });
        lastoperation = operation.lastoperation;
        lastoperationstatus = operation.lastoperationstatus;
      } catch (e) {
        result += '<BR>Excep[tion while retreiving client information ' + e;
        return result;
      }
      console.log("Length :",this.cellStore.length);

      
      
      // Maybe create a store to save the cell infromation if you plan on using it....
      //
      // Look at the current production
      //
      const production: string = request['production'];
      let resultOfDrilling=0;
      if (production != null) {
        const listOfCellProduction: string[] = production.split(' ');
        const countOfProducingCells: number = listOfCellProduction.length;

        for (let i = 0; i < countOfProducingCells; i++) {
          const prodinfo: string[] = listOfCellProduction[i].split(',');
          if (prodinfo.length < 3) continue;

          let x: number = parseInt(prodinfo[0]);
          let y: number = parseInt(prodinfo[1]);
          let p: number = parseInt(prodinfo[2]);
          resultOfDrilling=p;
          
        }
      }
      if(!this.first1 && this.cellStore.length==0){
        this.zero = true;
      }
      if(this.m_money<=0.90*this.max_money && this.cellStore.length!=0){
        const myCell = this.cellStore.shift();
        // console.log(myCell.x,myCell.y);
        result += this.StopProduction(myCell.x,myCell.y);
      }else{
        if(lastoperation=="Explore" && resultOfDrilling<22){
          // console.log(resultOfDrilling);
          this.i=8;
          this.m_stepCount+=1;
        }
        // if(lastoperation=="Drill" && resultOfDrilling<1){
        //   console.log(resultOfDrilling);
        //   this.i++;
        //   this.m_stepCount+=2;
        // }
        let arr=[ 0, 1, 0, -1,1,1,-1 ,-1];
        let arr1=[-1, 0, 1, 0,1,-1,-1,1];
        
        let size=8;
        // console.log("one");
        // console.log(resultOfDrilling);
        // Now what should I do
        // You can probably do better than this random strategy......
        if (this.m_buyIndex == -1) {
          // Buy buy buy!
          this.m_X = this.m_random(0, this.m_width);
          this.m_Y = this.m_random(0, this.m_height);
          this.ogX=this.m_X;
          this.ogY=this.m_Y;
          result += this.TryToPurchaseAt(this.m_X, this.m_Y);
          this.cellStore.push({x:this.m_X,y:this.m_Y});
          // console.log("buy",this.cellStore.length,"hellp2");
          this.m_buyIndex = this.m_stepCount;
        } else if (this.m_buyIndex == this.m_stepCount - 1) {
          // Blindly try to drill
        // console.log("drill");
          result += this.TryToDrillAt(this.m_X, this.m_Y, true);
        }
        else if (this.m_buyIndex == this.m_stepCount - 2) {
        // console.log("explore");
          // Blindly try to stimulate
          result += this.TryToExploreAt(this.m_X, this.m_Y, true);
        }
        else if (this.m_buyIndex == this.m_stepCount - 3) {
        // console.log("stim");
          // Blindly try to stimulate
          result += this.TryToStimulateAt(this.m_X, this.m_Y, true);
        } 
        else if (this.m_buyIndex == this.m_stepCount - 4) {
          // Buy buy buy!
          //console.log(resultOfDrilling);
          if(this.i==size){
          
          this.m_X = this.m_random(0, this.m_width);
          this.m_Y = this.m_random(0, this.m_height);
          result += this.TryToPurchaseAt(this.m_X, this.m_Y);
          
          this.cellStore.push({x:this.m_X,y:this.m_Y});
          this.i=0;
          this.ogX=this.m_X;
          this.ogY=this.m_Y;
          }
          else{
            
            this.m_X=this.ogX+arr[this.i];
            this.m_Y=this.ogY+arr1[this.i];
            result+= this.TryToPurchaseAt(this.m_X, this.m_Y);
            this.cellStore.push({x:this.m_X,y:this.m_Y});
            this.i++;
          }
          this.m_buyIndex = this.m_stepCount;
        }
        
      }

      
    } catch (e) {
      result += '<BR>Exception while handling request ' + e;
    }

    return result;
  }

  private ParseInput(
    request: any,
    operation: { lastoperation: string; lastoperationstatus: boolean }
  ) {
    for (const s in request) {
      switch (s) {
        case 'round':
          this.m_round = parseInt(request[s]);
          if (this.m_round == 0) {
            SimulatorNode.m_cells = null;
            this.m_width = 0;
            this.m_height = 0;
          }
          break;
        case 'money':
          this.m_money = parseInt(request[s]);
          break;
        case 'width':
          this.m_width = parseInt(request[s]);
          break;
        case 'height':
          this.m_height = parseInt(request[s]);
          break;
        case 'lastoperation':
          operation.lastoperation = request[s];
          break;
        case 'lastoperationstatus':
          operation.lastoperationstatus = request[s] == 'True';
          break;
        case 'index':
          this.m_index = parseInt(request[s]);
          break;
      }
    }
    return operation;
  }

  private TryToPurchaseAt(x: number, y: number): string {
    let result = '';
    result += '<Execute>Buy</Execute>';
    result += '<BuyAtX>' + x + '</BuyAtX>';
    result += '<BuyAtY>' + y + '</BuyAtY>';
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private ConfirmPurchaseAt(x: number, y: number): string {
    let result = '';
    // Capture we have bought at X/Y (previous round)
    if (!SimulatorNode.m_cells[this.m_X][this.m_Y]) {
      SimulatorNode.m_cells[this.m_X][this.m_Y] = new CellState(
        this.m_X,
        this.m_Y
      );
    }

    SimulatorNode.m_cells[this.m_X][this.m_Y].MarkAsPurchased();
    result += '<HR>Purchased ' + this.m_X + ' ' + this.m_Y;
    return result;
  }

  private StopProduction(x: number, y: number): string {
    let result = '';
    result +=
      '<Execute>StopProduction</Execute><StopProductionAtX>' +
      x +
      '</StopProductionAtX><StopProductionAtY>' +
      y +
      '</StopProductionAtY>';
    return result;
  }

  private TryToExploreAt(x: number, y: number, slb: boolean): string {
    let result = '';
    result += '<Execute>Explore</Execute>';
    result += '<ExploreAtX>' + x + '</ExploreAtX>';
    result += '<ExploreAtY>' + y + '</ExploreAtY>';
    result += '<ServiceProvider>';
    if (slb) {
      result += 'SLB';
    } else {
      result += 'HAL';
    }
    result += '</ServiceProvider>';
    return result;
  }
  private TryToDrillAt(x: number, y: number, slb: boolean): string {
    let result = '';
    result += '<Execute>Drill</Execute>';
    result += '<DrillAtX>' + x + '</DrillAtX>';
    result += '<DrillAtY>' + y + '</DrillAtY>';
    result += '<ServiceProvider>';
    if (slb) {
      result += 'SLB';
    } else {
      result += 'HAL';
    }
    result += '</ServiceProvider>';
    return result;
  }
  private TryToStimulateAt(x: number, y: number, slb: boolean): string {
    let result = '';
    result += '<Execute>Stimulate</Execute>';
    result += '<StimulateAtX>' + x + '</StimulateAtX>';
    result += '<StimulateAtY>' + y + '</StimulateAtY>';
    result += '<ServiceProvider>';
    if (slb) {
      result += 'SLB';
    } else {
      result += 'HAL';
    }
    result += '</ServiceProvider>';
    return result;
  }
}
