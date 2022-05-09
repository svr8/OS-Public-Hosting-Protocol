const crypto = require('crypto')

class Block {
  constructor(data, prevHash = "") {
    this.timestamp = Date.now()
    this.data = data
    this.prevHash = prevHash
    this.hash = this.computeHash()
  }

  computeHash() {
    let str = this.prevHash + this.timestamp + JSON.stringify(this.data)
    return crypto.createHash('sha256').update(str).digest('hex')
  }
}

class BlockChain {
  constructor() {
    this.blocks = [this.getGenesisBlock()]
    this.metadata = {}
  }

  getGenesisBlock() {
    return new Block({})
  }

  getLatestBlock() {
    return this.blocks[this.blocks.length-1]
  }

  addData(data) {
    const block = new Block(data, this.getLatestBlock().hash)
    this.blocks.push(block)
  }

  checkChainValidity() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i]
      const prevBlock = this.blocks[i-1]

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false
      }

      if (currentBlock.prevHash !== prevBlock.hash) {
        return false
      }
    }

    return true
  }


}

module.exports = {
  BlockChain
}