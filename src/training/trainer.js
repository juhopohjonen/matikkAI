const fs = require('fs')
const { DATA_PATH } = require('../utils/config')

const brain = require('brain.js')

const get_json = (path) => {
    const text = fs.readFileSync(path, 'utf8')
    const data = JSON.parse(text)
    return data
} 

const train_model = (path, config) => {
    let data = null

    try {
        const text = fs.readFileSync(path, 'utf8')
        data = JSON.parse(text)
    } catch (e) {
        console.error('Error: invalid training data or path!')
        console.log('path is', path)
        console.error(e)
    }

    // change format

    train_data = data.map(cell => {
        const { question, answer, interphases } = cell
        return {
            input: question,
            output: [answer, interphases]
        }
    })

    const net = new brain.recurrent.LSTM()
    net.train(train_data, config)    

    return net
}


const get_network = () => {
    // make sure that DATA_PATH exists
    if (!DATA_PATH) throw Error('DATA_PATH environment value required')

    const TRAINED_MODEL_PATH = DATA_PATH + 'trainedmodel.json'
    const TRAIN_DATA_PATH = DATA_PATH + 'trainingdata.json'

    if (!fs.existsSync(TRAINED_MODEL_PATH)) {
        console.warn('FILE NOT EXISTS: training new with data.')

        // train + save model

        const model = train_model(TRAIN_DATA_PATH, { log: true, iterations: 3000 })
        fs.writeFileSync(TRAINED_MODEL_PATH, JSON.stringify(model.toJSON()), "utf-8")

        return model
    }

    // get model from JSON and return it
    const model_data = get_json(TRAINED_MODEL_PATH)

    const net = new brain.recurrent.LSTM()
    net.fromJSON(model_data)

    return net
}

const force_train = (TRAIN_DATA_PATH, TRAINED_MODEL_PATH, config) => {
    console.warn('Training...')

    // train + save model

    const model = train_model(TRAIN_DATA_PATH, config)
    fs.writeFileSync(TRAINED_MODEL_PATH, JSON.stringify(model.toJSON()), "utf-8")

    return model
}


module.exports = {
    get_network,
    force_train
}