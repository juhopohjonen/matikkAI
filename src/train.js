// application for calling trainer

const trainer = require('./training/trainer')
const { DATA_PATH } = require('./utils/config')

const TRAINING_URI = DATA_PATH + 'trainingdata.json'
const TRAINED_MODEL_PATH = DATA_PATH + 'trainedmodel.json'

const args = process.argv.slice(2)

const iterations = args.length > 0 ? Number(args[0]) : 3000
const log = true

console.log('Training with', iterations, 'iterations')


try {
    trainer.force_train(TRAINING_URI, TRAINED_MODEL_PATH, {
        iterations: iterations,
        log
    })
} catch (e) {
    console.error('TRAINING FAILED!')
    console.error(e)
}

