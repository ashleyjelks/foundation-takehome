This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi).

To run this application locally:
1. Add your Wallet Connect Project ID to .env.local at `NEXT_PUBLIC_WC_PROJECT_ID`
2. Run `npm i && npm run dev` to install deps and run local server
3. Navigate to ` http://localhost:3000` where you will need to connect your Coinbase, Metamask, or WalletConnect wallets.
4. Select Sign Message to trigger the verifcation flow and view your wallet's account details.


Here's what I'd continue to work on if I had more time:

- Using Tailwind, Styled Components or some other sort of CSS framework instead of how I handled styling (all inline styling)
- Handle form validation with react-hooks-form instead of manually via state
- I'd add CSS media queries to optimize responsiveness on all device sizes as currently it's only optimized for Desktop, not mobile
- Enable handling for all error and loading states, as only some are currently handled (e.g. could add them for ENS Address lookup errors, ETH Balance lookup errors, ENS Name lookup errors, and handling all loading states when connecting wallet instead of just "connected" and "disconnected", etc.)
- I'd continue to enhance the styling on the WalletConnect component where we show Connect/Disconnect Your Wallet and the related interactive buttons
- I'd debug where the issues I had encoding and decoding the signature token and calling signature verification with ethers wasn't working as expected
- I'd update state handlers to automatically populate the form and submit ENS Lookup on signature verification success
- I'd refactor the code to make to expand the reusuability of existing, similar, and/or duplicated components
- I'd spend more time getting the ENS Lookup form gradient more pixel perfect per the Figma specs provided.
- I'd do an a11y audit to improve accesibility (e.g. make sure all images have alt tags, expanded use of aria labels, semantic tags, and run through a web accessibilty checker)
- I'd do some cross browser testing to test how the site renders outside of Chrome
- Use Redux, or more likely Context API given the size of this app to mangage passing and propagating state between components
- The way I'm handling the error state on the form (submitting without wallet being connected or signature validated) is a quick solution to provide users an error state but as I said it would be better to wire it up to a form validation lib and rather than just using state to hide/show the error. Also a user has to refresh to get the initial state which isn't ideal, another fix I'd address.
- Clean up any remaining TS warnings
