import { ethers } from 'hardhat';
import fs from 'fs';
import path from 'path';

async function main() {
  const Contract = await ethers.getContractFactory('TestNFT');

  console.log('Deploying NFT...');
  const contract = await Contract.deploy();

  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log('NFT deployed to:', contractAddress);

  const deployedAddressPath = path.join(__dirname, '..', 'utils', 'deployed-address.ts');

  const fileContent = `const deployedAddress = '${contractAddress}'\n\n export default deployedAddress\n`;

  fs.mkdirSync(path.join(__dirname, '..', 'utils'), { recursive: true });
  fs.writeFileSync(deployedAddressPath, fileContent, { encoding: 'utf8' });
  console.log('Address written to deployed-address.ts');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });