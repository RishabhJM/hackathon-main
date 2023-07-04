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
  public cellStore = [];
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

      if(lastoperation=="Explore" && resultOfDrilling<22){
        console.log(resultOfDrilling);
        this.i=8;
        this.m_stepCount+=1;
      }

      if(lastoperation=="Drill" && resultOfDrilling<1){
        console.log(resultOfDrilling);
        this.i++;
        this.m_stepCount+=2;
      }
      let arr=[ 0, 1, 0, -1,1,1,-1 ,-1];
      let arr1=[-1, 0, 1, 0,1,-1,-1,1];
      
      let size=8;
      
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
        this.m_buyIndex = this.m_stepCount;
      } else if (this.m_buyIndex == this.m_stepCount - 1) {
        // Blindly try to drill
        result += this.TryToDrillAt(this.m_X, this.m_Y, true);

      }
      else if (this.m_buyIndex == this.m_stepCount - 2) {
        // Blindly try to stimulate
        result += this.TryToExploreAt(this.m_X, this.m_Y, true);
        
      }
      else if (this.m_buyIndex == this.m_stepCount - 4) {
        // Blindly try to stimulate
        result += this.TryToStimulateAt(this.m_X, this.m_Y, true);
      }
      else if (this.m_buyIndex == this.m_stepCount - 3) {
        // Blindly try to stimulate
        this.StopProduction(this.m_X,this.m_Y);;
      } 
      else if (this.m_buyIndex == this.m_stepCount - 5) {
        // Buy buy buy!
        //console.log(resultOfDrilling);
        if(this.i==size){
        
        this.m_X = this.m_random(0, this.m_width);
        this.m_Y = this.m_random(0, this.m_height);
        result += this.TryToPurchaseAt(this.m_X, this.m_Y);
        this.i=0;
        this.ogX=this.m_X;
        this.ogY=this.m_Y;
        }
        else{
          
          this.m_X=this.ogX+arr[this.i];
          this.m_Y=this.ogY+arr1[this.i];
          result+= this.TryToPurchaseAt(this.m_X, this.m_Y);
        
          this.i++;
        }
        this.m_buyIndex = this.m_stepCount;
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
