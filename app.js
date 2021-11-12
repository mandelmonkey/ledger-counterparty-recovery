const seedPhrase = "REPLACE WITH YOUR PHRASE i.e. sock dog guitar...";
const addressToFind = "ENTER THE ADDRESS TO FIND i.e. 1GvRme7Lfsj2NEJmwrVEhgAjtjHpeGbf2h5";
const depth = 50;

var Bip39 = require('bip39');
const Bip32 = require('bip32');
const Bitcoin = require('bitcoinjs-lib');

function getAddress (node, network) {
  return Bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
}

const seed = Bip39.mnemonicToSeedSync(seedPhrase);
const rootIndex = 44;
const root = Bip32.fromSeed(seed, Bitcoin.networks.bitcoin);
let progress = 0;
  
for(var i = 0;i<depth;i++){
  for(var i2 = 0;i2<depth;i2++){
    for(var i3 = 0;i3<depth;i3++){
      const child = root.deriveHardened(rootIndex).deriveHardened(i).deriveHardened(i2).derive(i3);
      const address = getAddress(child);
      if(address === addressToFind ){
        process.stdout.write("\n");
        process.stdout.write("\n");
        console.log("found WIF is:"+child.toWIF());
        return;
      }
      progress++;
      const percentComplete = (progress / (depth ** 3) * 100).toFixed(2);
      process.stdout.write("searching 1/2 " +percentComplete+"% - "+rootIndex+"'/"+ i+"'/"+i2+"'/"+ i3+" address - "+address+"\r");
    }
  }

}
progress = 0;
process.stdout.write("\n");
process.stdout.write("\n");
console.log("not found checking one layer deeper, this will take a while...");
process.stdout.write("\n");

for(var i = 0;i<depth;i++){
  for(var i2 = 0;i2<depth;i2++){
    for(var i3 = 0;i3<depth;i3++){
      for(var i4 = 0;i4<depth;i4++){
        const child = root.deriveHardened(rootIndex).deriveHardened(i).deriveHardened(i2).deriveHardened(i3).derive(i4);
        const address = getAddress(child);
        if(address === addressToFind ){
          process.stdout.write("\n");
          process.stdout.write("\n");
          console.log("found WIF is:"+child.toWIF());
          return;
        }
        progress++;
        const percentComplete = (progress / (depth ** 4) * 100).toFixed(2);

        process.stdout.write("searching 2/2 " +percentComplete+"% - "+rootIndex+"'/"+ i+"'/"+i2+"'/"+ i3+"'/"+i4+" address - "+address+"\r");
      }
    }
  }

}
process.stdout.write("\n");
process.stdout.write("\n");
console.log("not found");
 