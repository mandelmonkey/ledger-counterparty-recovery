const seedPhrase = "REPLACE WITH YOUR PHRASE i.e. sock dog guitar...";
const addressToFind = "ENTER THE ADDRESS TO FIND i.e. 1GvRme7Lfsj2NEJmwrVEhgAjtjHpeGbf2h5";
const depth = 100;

var Bip39 = require('bip39');
const Bip32 = require('bip32');
const Bitcoin = require('bitcoinjs-lib');

function getAddress (node, network) {
  return Bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

const seed = Bip39.mnemonicToSeedSync(seedPhrase);
 
const root = Bip32.fromSeed(seed, Bitcoin.networks.bitcoin);
let progress = 0;

console.log("searching please wait...");
 
for(var i = 0;i<depth;i++){
  for(var i2 = 0;i2<depth;i2++){
    for(var i3 = 0;i3<depth;i3++){
      const child = root.deriveHardened(44).deriveHardened(i).deriveHardened(i2).derive(i3);
      if(getAddress(child) === addressToFind ){
        console.log("found at " +i+" "+i2+" "+ i3+" WIF is:"+child.toWIF());
        break;
      }
      progress++;
      console.log((progress / (depth ** 3) * 100) +"% "+ i+" "+i2+" "+ i3);
    }
  }

}

console.log("not found");
 