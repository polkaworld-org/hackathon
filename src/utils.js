const { naclVerify, encodeAddress } = require('@polkadot/util-crypto');

const requestData = {
  signature:
    '0xa402b7c80d056a4f7c0143b58b13ce863b28b51d9137de06735c55050ee3959705eb476732e2400d55230dad0f7290d204c8beacfe8cbb1adb3b3a4944dd1202',
  publicKey: '0x1dd330d16b5a5a371c0e8a3da99cf6f22f17307a6f60f5c9634d6ee6aa262d11',
  target: '5HFKMyCrZhzPUb8sdRFgDJCJhqpN3HVsQJyGwV5X6W83VVSh', // 被投票的人
  score: 5, // 分数 1 - 10
};

let result = false; // 投票结果

try {
  result = naclVerify(`${requestData.target}:${requestData.score}`, requestData.signature, requestData.publicKey);
} catch {
  result = false;
}

const address = encodeAddress(requestData.publicKey); // 投票人地址
