class Vertex {
  constructor(name){
    this.name = name;
    this.paths = [];
    this.hexes = [];
    this.neighbors = [];
    this.owner = null;
    this.city = false;
    this.port = null;
  }
}

class Path {
  constructor(name){
    this.name = name;
    this.vertexes = [];
    this.owner = null;
    this.adjacent_roads = [];
  }
}

class Hex {
  constructor(name){
    this.name = name;
    this.vertexes = [];
    this.number = null;
    this.resource = null;
    this.robber = false;
  }
}

class Player {
  constructor(name, number){
    this.name = name;
    this.number = number;
    this.wheat = 0;
    this.lumber = 0;
    this.brick = 0;
    this.sheep = 0;
    this.ore = 0;
    this.points = 0;
    this.ports = [];
    this.purchased_cards = [];
    this.played_cards = [];
  }
}

const ports = [2, 3, 5, 6, 15, 25, 36, 46, 53, 52, 50, 49, 39, 38, 27, 16, 7, 8];
const startPortIndices= [0, 3, 6];
const portTypes = [
  {resource: "triple", class: "triplePort"},
  {resource: "triple", class: "triplePort"},
  {resource: "brick", class: "brickPort"},
  {resource: "lumber", class: "lumberPort"},
  {resource: "triple", class: "triplePort"},
  {resource: "wheat", class: "wheatPort"},
  {resource: "ore", class: "orePort"},
  {resource: "triple", class: "triplePort"},
  {resource: "sheep", class: "sheepPort"},
]

const randomFields = () => {
  let fields = ['ore', 'ore', 'ore', 'wheat', 'wheat', 'wheat', 'wheat', 'lumber', 'lumber', 'lumber', 'lumber', 'sheep', 'sheep', 'sheep', 'sheep', 'brick', 'brick', 'brick', null];
  var currentIndex = fields.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = fields[currentIndex];
    fields[currentIndex] = fields[randomIndex];
    fields[randomIndex] = temporaryValue;
  }

  return fields;
}

const setupBoard = (hexes, vertexes, paths, document) => {
  let h = document.querySelectorAll('div.hexagon');
  for (let i = 0; i < h.length; i++) {
    let hex = new Hex(h[i]['id']);
    hexes.push(hex);
  }
  let v = document.querySelectorAll('div.vertex');
  for (let i = 0; i < v.length; i++) {
    let vertex = new Vertex(v[i]['id']);
    vertexes.push(vertex);
  }
  let p = document.querySelectorAll('div.path');
  for (let i = 0; i < p.length; i++) {
    let path = new Path(p[i]['id']);
    paths.push(path);
  }
  let vertices = document.querySelectorAll('div.vertex');
  for (let i = 0; i < ports.length; i++) {
    let type = portTypes[Math.floor(i/2)];
    vertices[ports[i]]['classList'].add(type.class);
    let vertex = vertexes[vertices[ports[i]]['id'].replace("vertex", "")];
    vertex.port = type.resource;
  }

  vertexes[0].hexes = [hexes[0]];
  vertexes[0].paths = [paths[0], paths[6]];
  vertexes[0].neighbors = [vertexes[1], vertexes[8]];
  
  vertexes[1].hexes = [hexes[0]];
  vertexes[1].paths = [paths[0], paths[1]];
  vertexes[1].neighbors = [vertexes[0], vertexes[2]];
  
  vertexes[2].hexes = [hexes[0], hexes[1]];
  vertexes[2].paths = [paths[1], paths[2], paths[7]];
  vertexes[2].neighbors = [vertexes[1], vertexes[3], vertexes[10]];
  
  vertexes[3].hexes = [hexes[1]];
  vertexes[3].paths = [paths[2], paths[3]];
  vertexes[3].neighbors = [vertexes[2], vertexes[4]];
  
  vertexes[4].hexes = [hexes[1], hexes[2]];
  vertexes[4].paths = [paths[3], paths[4], paths[8]];
  vertexes[4].neighbors = [vertexes[3], vertexes[5], vertexes[12]];
  
  vertexes[5].hexes = [hexes[2]];
  vertexes[5].paths = [paths[4], paths[5]];
  vertexes[5].neighbors = [vertexes[4], vertexes[6]];
  
  vertexes[6].hexes = [hexes[2]];
  vertexes[6].paths = [paths[5], paths[9]];
  vertexes[6].neighbors = [vertexes[5], vertexes[14]];
  
  vertexes[7].hexes = [hexes[3]];
  vertexes[7].paths = [paths[10], paths[18]];
  vertexes[7].neighbors = [vertexes[8], vertexes[17]];
  
  vertexes[8].hexes = [hexes[0], hexes[3]];
  vertexes[8].paths = [paths[6], paths[10], paths[11]];
  vertexes[8].neighbors = [vertexes[0], vertexes[7], vertexes[9]];
  
  vertexes[9].hexes = [hexes[0], hexes[3], hexes[4]];
  vertexes[9].paths = [paths[11], paths[12], paths[19]];
  vertexes[9].neighbors = [vertexes[8], vertexes[10], vertexes[19]];
  
  vertexes[10].hexes = [hexes[0], hexes[1], hexes[4]];
  vertexes[10].paths = [paths[7], paths[12], paths[13]];
  vertexes[10].neighbors = [vertexes[2], vertexes[9], vertexes[11]];
  
  vertexes[11].hexes = [hexes[1], hexes[4], hexes[5]];
  vertexes[11].paths = [paths[13], paths[14], paths[20]];
  vertexes[11].neighbors = [vertexes[10], vertexes[12], vertexes[21]];
  
  vertexes[12].hexes = [hexes[1], hexes[2], hexes[5]];
  vertexes[12].paths = [paths[8], paths[14], paths[15]];
  vertexes[12].neighbors = [vertexes[4], vertexes[11], vertexes[13]];
  
  vertexes[13].hexes = [hexes[2], hexes[5], hexes[6]];
  vertexes[13].paths = [paths[15], paths[16], paths[21]];
  vertexes[13].neighbors = [vertexes[12], vertexes[14], vertexes[23]];
  
  vertexes[14].hexes = [hexes[2], hexes[6]];
  vertexes[14].paths = [paths[9], paths[16], paths[17]];
  vertexes[14].neighbors = [vertexes[6], vertexes[13], vertexes[15]];
  
  vertexes[15].hexes = [hexes[6]];
  vertexes[15].paths = [paths[17], paths[22]];
  vertexes[15].neighbors = [vertexes[14], vertexes[25]];
  
  vertexes[16].hexes = [hexes[7]];
  vertexes[16].paths = [paths[23], paths[33]];
  vertexes[16].neighbors = [vertexes[17], vertexes[27]];
  
  vertexes[17].hexes = [hexes[3], hexes[7]];
  vertexes[17].paths = [paths[18], paths[23], paths[24]];
  vertexes[17].neighbors = [vertexes[7], vertexes[16], vertexes[18]];
  
  vertexes[18].hexes = [hexes[3], hexes[7], hexes[8]];
  vertexes[18].paths = [paths[24], paths[25], paths[34]];
  vertexes[18].neighbors = [vertexes[17], vertexes[19], vertexes[29]];
  
  vertexes[19].hexes = [hexes[3], hexes[4], hexes[8]];
  vertexes[19].paths = [paths[19], paths[25], paths[26]];
  vertexes[19].neighbors = [vertexes[9], vertexes[18], vertexes[20]];
  
  vertexes[20].hexes = [hexes[4], hexes[8], hexes[9]];
  vertexes[20].paths = [paths[26], paths[27], paths[35]];
  vertexes[20].neighbors = [vertexes[19], vertexes[21], vertexes[31]];
  
  vertexes[21].hexes = [hexes[4], hexes[5], hexes[9]];
  vertexes[21].paths = [paths[20], paths[27], paths[28]];
  vertexes[21].neighbors = [vertexes[11], vertexes[20], vertexes[22]];
  
  vertexes[22].hexes = [hexes[5], hexes[9], hexes[10]];
  vertexes[22].paths = [paths[28], paths[29], paths[36]];
  vertexes[22].neighbors = [vertexes[21], vertexes[23], vertexes[33]];
  
  vertexes[23].hexes = [hexes[5], hexes[6], hexes[10]];
  vertexes[23].paths = [paths[21], paths[29], paths[30]];
  vertexes[23].neighbors = [vertexes[13], vertexes[22], vertexes[24]];
  
  vertexes[24].hexes = [hexes[6], hexes[10], hexes[11]];
  vertexes[24].paths = [paths[30], paths[31], paths[37]];
  vertexes[24].neighbors = [vertexes[23], vertexes[25], vertexes[35]];
  
  vertexes[25].hexes = [hexes[6], hexes[11]];
  vertexes[25].paths = [paths[22], paths[31], paths[32]];
  vertexes[25].neighbors = [vertexes[15], vertexes[24], vertexes[26]];
  
  vertexes[26].hexes = [hexes[11]];
  vertexes[26].paths = [paths[32], paths[38]];
  vertexes[26].neighbors = [vertexes[25], vertexes[37]];
  
  vertexes[27].hexes = [hexes[7]];
  vertexes[27].paths = [paths[33], paths[39]];
  vertexes[27].neighbors = [vertexes[16], vertexes[28]];
  
  vertexes[28].hexes = [hexes[7], hexes[12]];
  vertexes[28].paths = [paths[39], paths[40], paths[49]];
  vertexes[28].neighbors = [vertexes[27], vertexes[29], vertexes[38]];
  
  vertexes[29].hexes = [hexes[7], hexes[8], hexes[12]];
  vertexes[29].paths = [paths[34], paths[40], paths[41]];
  vertexes[29].neighbors = [vertexes[18], vertexes[28], vertexes[30]];
  
  vertexes[30].hexes = [hexes[8], hexes[12], hexes[13]];
  vertexes[30].paths = [paths[41], paths[42], paths[50]];
  vertexes[30].neighbors = [vertexes[29], vertexes[31], vertexes[40]];
  
  vertexes[31].hexes = [hexes[8], hexes[9], hexes[13]];
  vertexes[31].paths = [paths[35], paths[42], paths[43]];
  vertexes[31].neighbors = [vertexes[20], vertexes[30], vertexes[32]];
  
  vertexes[32].hexes = [hexes[9], hexes[13], hexes[14]];
  vertexes[32].paths = [paths[43], paths[44], paths[51]];
  vertexes[32].neighbors = [vertexes[31], vertexes[33], vertexes[42]];
  
  vertexes[33].hexes = [hexes[9], hexes[10], hexes[14]];
  vertexes[33].paths = [paths[36], paths[44], paths[45]];
  vertexes[33].neighbors = [vertexes[22], vertexes[32], vertexes[34]];
  
  vertexes[34].hexes = [hexes[10], hexes[14], hexes[15]];
  vertexes[34].paths = [paths[45], paths[46], paths[52]];
  vertexes[34].neighbors = [vertexes[33], vertexes[35], vertexes[44]];
  
  vertexes[35].hexes = [hexes[10], hexes[11], hexes[15]];
  vertexes[35].paths = [paths[37], paths[46], paths[47]];
  vertexes[35].neighbors = [vertexes[24], vertexes[34], vertexes[36]];
  
  vertexes[36].hexes = [hexes[11], hexes[15]];
  vertexes[36].paths = [paths[47], paths[48], paths[53]];
  vertexes[36].neighbors = [vertexes[35], vertexes[37], vertexes[46]];
  
  vertexes[37].hexes = [hexes[11]];
  vertexes[37].paths = [paths[38], paths[48]];
  vertexes[37].neighbors = [vertexes[26], vertexes[36]];
  
  vertexes[38].hexes = [hexes[12]];
  vertexes[38].paths = [paths[49], paths[54]];
  vertexes[38].neighbors = [vertexes[28], vertexes[39]];
  
  vertexes[39].hexes = [hexes[12], hexes[16]];
  vertexes[39].paths = [paths[54], paths[55], paths[62]];
  vertexes[39].neighbors = [vertexes[38], vertexes[40], vertexes[47]];
  
  vertexes[40].hexes = [hexes[12], hexes[13], hexes[16]];
  vertexes[40].paths = [paths[50], paths[55], paths[56]];
  vertexes[40].neighbors = [vertexes[30], vertexes[39], vertexes[41]];
  
  vertexes[41].hexes = [hexes[13], hexes[16], hexes[17]];
  vertexes[41].paths = [paths[56], paths[57], paths[63]];
  vertexes[41].neighbors = [vertexes[40], vertexes[42], vertexes[49]];
  
  vertexes[42].hexes = [hexes[13], hexes[14], hexes[17]];
  vertexes[42].paths = [paths[51], paths[57], paths[58]];
  vertexes[42].neighbors = [vertexes[32], vertexes[41], vertexes[43]];
  
  vertexes[43].hexes = [hexes[14], hexes[17], hexes[18]];
  vertexes[43].paths = [paths[58], paths[59], paths[64]];
  vertexes[43].neighbors = [vertexes[42], vertexes[44], vertexes[51]];
  
  vertexes[44].hexes = [hexes[14], hexes[15], hexes[18]];
  vertexes[44].paths = [paths[52], paths[59], paths[60]];
  vertexes[44].neighbors = [vertexes[34], vertexes[43], vertexes[45]];
  
  vertexes[45].hexes = [hexes[15], hexes[18]];
  vertexes[45].paths = [paths[60], paths[61], paths[65]];
  vertexes[45].neighbors = [vertexes[44], vertexes[46], vertexes[53]];
  
  vertexes[46].hexes = [hexes[15]];
  vertexes[46].paths = [paths[53], paths[61]];
  vertexes[46].neighbors = [vertexes[36], vertexes[45]];
  
  vertexes[47].hexes = [hexes[16]];
  vertexes[47].paths = [paths[62], paths[66]];
  vertexes[47].neighbors = [vertexes[39], vertexes[48]];
  
  vertexes[48].hexes = [hexes[16]];
  vertexes[48].paths = [paths[66], paths[67]];
  vertexes[48].neighbors = [vertexes[47], vertexes[49]];
  
  vertexes[49].hexes = [hexes[16], hexes[17]];
  vertexes[49].paths = [paths[63], paths[67], paths[68]];
  vertexes[49].neighbors = [vertexes[41], vertexes[48], vertexes[50]];
  
  vertexes[50].hexes = [hexes[17]];
  vertexes[50].paths = [paths[68], paths[69]];
  vertexes[50].neighbors = [vertexes[49], vertexes[51]];
  
  vertexes[51].hexes = [hexes[17], hexes[18]];
  vertexes[51].paths = [paths[64], paths[69], paths[70]];
  vertexes[51].neighbors = [vertexes[43], vertexes[50], vertexes[52]];
  
  vertexes[52].hexes = [hexes[18]];
  vertexes[52].paths = [paths[70], paths[71]];
  vertexes[52].neighbors = [vertexes[51], vertexes[53]];
  
  vertexes[53].hexes = [hexes[18]];
  vertexes[53].paths = [paths[65], paths[71]];
  vertexes[53].neighbors = [vertexes[45], vertexes[52]];
  
  hexes[0].vertexes = [vertexes[0], vertexes[1], vertexes[2], vertexes[8], vertexes[9], vertexes[10]];
  hexes[1].vertexes = [vertexes[2], vertexes[3], vertexes[4], vertexes[10], vertexes[11], vertexes[12]];
  hexes[2].vertexes = [vertexes[4], vertexes[5], vertexes[6], vertexes[12], vertexes[13], vertexes[14]];
  hexes[3].vertexes = [vertexes[7], vertexes[8], vertexes[9], vertexes[17], vertexes[18], vertexes[19]];
  hexes[4].vertexes = [vertexes[9], vertexes[10], vertexes[11], vertexes[19], vertexes[20], vertexes[21]];
  hexes[5].vertexes = [vertexes[11], vertexes[12], vertexes[13], vertexes[21], vertexes[22], vertexes[23]];
  hexes[6].vertexes = [vertexes[13], vertexes[14], vertexes[15], vertexes[23], vertexes[24], vertexes[25]];
  hexes[7].vertexes = [vertexes[16], vertexes[17], vertexes[18], vertexes[27], vertexes[28], vertexes[29]];
  hexes[8].vertexes = [vertexes[18], vertexes[19], vertexes[20], vertexes[29], vertexes[30], vertexes[31]];
  hexes[9].vertexes = [vertexes[20], vertexes[21], vertexes[22], vertexes[31], vertexes[32], vertexes[33]];
  hexes[10].vertexes = [vertexes[22], vertexes[23], vertexes[24], vertexes[33], vertexes[34], vertexes[35]];
  hexes[11].vertexes = [vertexes[24], vertexes[25], vertexes[26], vertexes[35], vertexes[36], vertexes[37]];
  hexes[12].vertexes = [vertexes[28], vertexes[29], vertexes[30], vertexes[38], vertexes[39], vertexes[40]];
  hexes[13].vertexes = [vertexes[30], vertexes[31], vertexes[32], vertexes[40], vertexes[41], vertexes[42]];
  hexes[14].vertexes = [vertexes[32], vertexes[33], vertexes[34], vertexes[42], vertexes[43], vertexes[44]];
  hexes[15].vertexes = [vertexes[34], vertexes[35], vertexes[36], vertexes[44], vertexes[45], vertexes[46]];
  hexes[16].vertexes = [vertexes[39], vertexes[40], vertexes[41], vertexes[47], vertexes[48], vertexes[49]];
  hexes[17].vertexes = [vertexes[41], vertexes[42], vertexes[43], vertexes[49], vertexes[50], vertexes[51]];
  hexes[18].vertexes = [vertexes[43], vertexes[44], vertexes[45], vertexes[51], vertexes[52], vertexes[53]];
  
  paths[0].vertexes = [vertexes[0], vertexes[1]];
  paths[1].vertexes = [vertexes[1], vertexes[2]];
  paths[2].vertexes = [vertexes[2], vertexes[3]];
  paths[3].vertexes = [vertexes[3], vertexes[4]];
  paths[4].vertexes = [vertexes[4], vertexes[5]];
  paths[5].vertexes = [vertexes[5], vertexes[6]];
  paths[6].vertexes = [vertexes[0], vertexes[8]];
  paths[7].vertexes = [vertexes[2], vertexes[10]];
  paths[8].vertexes = [vertexes[4], vertexes[12]];
  paths[9].vertexes = [vertexes[6], vertexes[14]];
  paths[10].vertexes = [vertexes[7], vertexes[8]];
  paths[11].vertexes = [vertexes[8], vertexes[9]];
  paths[12].vertexes = [vertexes[9], vertexes[10]];
  paths[13].vertexes = [vertexes[10], vertexes[11]];
  paths[14].vertexes = [vertexes[11], vertexes[12]];
  paths[15].vertexes = [vertexes[12], vertexes[13]];
  paths[16].vertexes = [vertexes[13], vertexes[14]];
  paths[17].vertexes = [vertexes[14], vertexes[15]];
  paths[18].vertexes = [vertexes[7], vertexes[17]];
  paths[19].vertexes = [vertexes[9], vertexes[19]];
  paths[20].vertexes = [vertexes[11], vertexes[21]];
  paths[21].vertexes = [vertexes[13], vertexes[23]];
  paths[22].vertexes = [vertexes[15], vertexes[25]];
  paths[23].vertexes = [vertexes[16], vertexes[17]];
  paths[24].vertexes = [vertexes[17], vertexes[18]];
  paths[25].vertexes = [vertexes[18], vertexes[19]];
  paths[26].vertexes = [vertexes[19], vertexes[20]];
  paths[27].vertexes = [vertexes[20], vertexes[21]];
  paths[28].vertexes = [vertexes[21], vertexes[22]];
  paths[29].vertexes = [vertexes[22], vertexes[23]];
  paths[30].vertexes = [vertexes[23], vertexes[24]];
  paths[31].vertexes = [vertexes[24], vertexes[25]];
  paths[32].vertexes = [vertexes[25], vertexes[26]];
  paths[33].vertexes = [vertexes[16], vertexes[27]];
  paths[34].vertexes = [vertexes[18], vertexes[29]];
  paths[35].vertexes = [vertexes[20], vertexes[31]];
  paths[36].vertexes = [vertexes[22], vertexes[33]];
  paths[37].vertexes = [vertexes[24], vertexes[35]];
  paths[38].vertexes = [vertexes[26], vertexes[37]];
  paths[39].vertexes = [vertexes[27], vertexes[28]];
  paths[40].vertexes = [vertexes[28], vertexes[29]];
  paths[41].vertexes = [vertexes[29], vertexes[30]];
  paths[42].vertexes = [vertexes[30], vertexes[31]];
  paths[43].vertexes = [vertexes[31], vertexes[32]];
  paths[44].vertexes = [vertexes[32], vertexes[33]];
  paths[45].vertexes = [vertexes[33], vertexes[34]];
  paths[46].vertexes = [vertexes[34], vertexes[35]];
  paths[47].vertexes = [vertexes[35], vertexes[36]];
  paths[48].vertexes = [vertexes[36], vertexes[37]];
  paths[49].vertexes = [vertexes[28], vertexes[38]];
  paths[50].vertexes = [vertexes[30], vertexes[40]];
  paths[51].vertexes = [vertexes[32], vertexes[42]];
  paths[52].vertexes = [vertexes[34], vertexes[44]];
  paths[53].vertexes = [vertexes[36], vertexes[46]];
  paths[54].vertexes = [vertexes[38], vertexes[39]];
  paths[55].vertexes = [vertexes[39], vertexes[40]];
  paths[56].vertexes = [vertexes[40], vertexes[41]];
  paths[57].vertexes = [vertexes[41], vertexes[42]];
  paths[58].vertexes = [vertexes[42], vertexes[43]];
  paths[59].vertexes = [vertexes[43], vertexes[44]];
  paths[60].vertexes = [vertexes[44], vertexes[45]];
  paths[61].vertexes = [vertexes[45], vertexes[46]];
  paths[62].vertexes = [vertexes[39], vertexes[47]];
  paths[63].vertexes = [vertexes[41], vertexes[49]];
  paths[64].vertexes = [vertexes[43], vertexes[51]];
  paths[65].vertexes = [vertexes[45], vertexes[53]];
  paths[66].vertexes = [vertexes[47], vertexes[48]];
  paths[67].vertexes = [vertexes[48], vertexes[49]];
  paths[68].vertexes = [vertexes[49], vertexes[50]];
  paths[69].vertexes = [vertexes[50], vertexes[51]];
  paths[70].vertexes = [vertexes[51], vertexes[52]];
  paths[71].vertexes = [vertexes[52], vertexes[53]];

  let numbers = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];
  let numberHexOrder = [0, 3, 7, 12, 16, 17, 18, 15, 11, 6, 2, 1, 4, 8, 13, 14, 10, 5, 9];

  let fields = document.querySelectorAll('div.hexagon');
  let hexNumbers = document.querySelectorAll('div.hexNumber');
  let fieldsArray = randomFields();
  let numbersIndex = 0;
  for (let i = 0; i < numberHexOrder.length; i++){
    if (fieldsArray[i]){
      fields[numberHexOrder[i]]['classList'].add(fieldsArray[i]);
      hexes[numberHexOrder[i]].number = numbers[numbersIndex];
      hexNumbers[numberHexOrder[i]]['textContent'] = numbers[numbersIndex];
      hexes[numberHexOrder[i]].resource = fieldsArray[i];
      numbersIndex++;
    }
    else {
      fields[numberHexOrder[i]]['classList'].add('desert');
      hexes[numberHexOrder[i]].number = 7;
      hexes[numberHexOrder[i]].robber = true;
      hexNumbers[numberHexOrder[i]]['textContent'] = 7;
      hexNumbers[numberHexOrder[i]]['classList'].add('robber');
    }
  }
}

let rand = Math.floor(Math.random() * startPortIndices.length);
for (let i = 0; i < rand; i++) {
  portTypes.unshift(portTypes.pop());
}

const shuffleCards = () => {
  let cards = ["Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Knight", "Road Building", "Road Building", "Year of Plenty", "Year of Plenty", "Monopoly", "Monopoly", "Market", "University", "Great hall", "Chapel", "Library"];

  var currentIndex = cards.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }

  return cards;
}

export { Vertex, Path, Hex, Player, setupBoard, shuffleCards }