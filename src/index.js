const brain = require('brain.js')
const trainer = require('./training/trainer')

const net = trainer.get_network()
console.log('Net initialized successfully. Run "ask.js" for solving math.')