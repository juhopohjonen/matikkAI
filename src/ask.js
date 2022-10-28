const trainer = require('./training/trainer')

const args = process.argv.slice(2)
const [question] = args

const net = trainer.get_network()
const answer = net.run(question)
 
console.log('Kysymys:', question)
console.log('Vastaus:', answer)