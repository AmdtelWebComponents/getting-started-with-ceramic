import { html, css, LitElement } from 'lit';

// import { CeramicClient } from '@ceramicnetwork/http-client'
// import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
// import { DIDDataStore } from '@glazed/did-datastore'
// import { DIDSession } from '@glazed/did-session'

// const ceramic = new CeramicClient("https://ceramic-clay.3boxlabs.com");

// const aliases = {
//   schemas: {
//     basicProfile: 'ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio',
//   },
//   definitions: {
//     BasicProfile: 'kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic',
//   },
//   tiles: {}
// }

// const datastore = new DIDDataStore({ ceramic, model: aliases });

export class GettingStartedWithCeramic extends LitElement {
  static get styles() {
    return css`
      :host {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr; 
        grid-template-rows: 0.5fr 1fr 1fr 0.5fr; 
        gap: 1em 1em; 
        grid-template-areas: 
            "Header Header Header"
            "Update-Profile Main-Content Main-Content"
            "Basic-Profile Main-Content Main-Content"
            "Footer Footer Footer"; 
        max-height: 98vh;
        color: var(--getting-started-with-ceramic-text-color, #000);
      }
      .Header {
        display: flex;
        justify-content: space-between;
        grid-area: Header;
        background-color: orange;
        align-items: center;
        padding: 1em;
      }
      .Update-Profile {
        display: grid; 
        grid-template-columns: 1fr 1fr; 
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr; 
        gap: 1em 1em; 
        grid-template-areas: 
            "Title Title"
            "Name Name"
            "Country Country"
            "Gender Gender"
            "Button Button"; 
        grid-area: Update-Profile;
        min-height: fit-content;
      }
      .Title { grid-area: Title; }
      .Name { grid-area: Name; place-items: center; }
      .Country { grid-area: Country; place-items: center; }
      .Gender { grid-area: Gender; place-items: center; }
      .Button { grid-area: Button; }
      .Basic-Profile { grid-area: Basic-Profile; }
      .Main-Content { grid-area: Main-Content;}
      .Footer { grid-area: Footer; }
      .BodyContainer {
          background-color: lightsalmon;
          border: 1px solid black;
          border-radius: 30px;
          padding: 1em;
      }
      .formfield {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
      }
      .forminput {
          min-width: 150px;

      }
      #submitBtn {
          display: block;
          margin: auto;
          width: auto;
      }
      .ProfileData {
          font-weight: bold;
      }
    `;
  }

  static get properties() {
    return {
      name: { type: String },
      country: { type: Number },
      gender: { type: String}
    };
  }

  constructor() {
    super();
    this.name = '';
    this.country = '';
  }

  render() {
    return html`
    <div class="Header">
        <h1 id="pageTitle">Getting Started With Ceramic with open-wc</h1>
        <button id="walletBtn">Connect Wallet</button>
    </div>
    <div class="Update-Profile BodyContainer">
        <div class="Title">
            <h2>Update Basic Profile on Ceramic</h2>
        </div>
        <div class="Name formfield">
            <label class="formLabel" for="name">Name:</label>
            <input class="forminput" type="text" id="name" placeholder="John Doe">
        </div>
        <div class="Country formfield">
            <label class="formLabel" for="country">Country:</label>
            <input class="forminput" type="text" id="country" placeholder="USA">
        </div>
        <div class="Gender formfield">
            <label class="formLabel" for="gender">Gender:</label>
            <select class="forminput" id="gender">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="Button formfield">
            <button class="forminput" id="submitBtn" @click="${this._getProfile}">Submit</button>
        </div>
    </div>
    <div class="Basic-Profile BodyContainer">
            <h2>Basic Profile</h2>
            <p>Read from Ceramic Datamodel</p>
            <br>
            <p class="ProfileData" id="profileName">${this.name}</p>
            <p class="ProfileData" id="profileGender">${this.country}</p>
            <p class="ProfileData" id="profileCountry">${this.gender}</p>
    </div>
    <div class="Main-Content BodyContainer"></div>
    <div class="Footer BodyContainer">This is the footer...</div>
    `;
  }
  
  _getProfile() {
    this.name = this.renderRoot.querySelector('#name').value;
    this.country = this.renderRoot.querySelector('#country').value;
    this.gender = this.renderRoot.querySelector('#gender').value;
    // console.log(ceramic, aliases, datastore)
  }
}
