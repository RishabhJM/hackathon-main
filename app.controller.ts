import { Body, Controller, Get, Post } from '@nestjs/common';
import { SimulatorNode } from './simulatorNode';

@Controller()
export class AppController {
  node = new SimulatorNode();

  @Get()
  getData() {
    return 'Welcome!';
  }

  @Post()
  postData(@Body() searchData:any):string {
  return this.node.OnStep(searchData);
  }
}
