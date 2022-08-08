import { html, css, LitElement } from 'lit';
import { CeramicMixin } from './bundle.js'; // Created from ceramic folder a mixin bundled for production with webpack.

export class GettingStartedWithCeramic extends CeramicMixin(LitElement) {
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
      .unSaved {
        color: white;
        background-color: red;
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
  };

  static get properties() {
    return {
      name: { type: String },
      country: { type: Number },
      gender: { type: String},
      _loggedIn: {type: Boolean}
    };
  };

  constructor() {
    super();
    this.name = '';
    this.country = '';
    this.gender = '';
    this._loggedIn = false;
  }

  render() {
    return html`
    <div class="Header">
        <h1 id="pageTitle">Getting Started With Ceramic with open-wc and glitch</h1>
        <button id="walletBtn" @click="${this.auth}">Connect Wallet</button>
    </div>
    <div class="Update-Profile BodyContainer">
        <div class="Title">
            <h2>Update Basic Profile on Ceramic</h2>
        </div>
        ${this._loggedIn ?
        html`
        <div class="Name formfield">
            <label class="formLabel" for="name">Name:</label>
            <input class="forminput" type="text" id="name" .value="${this.name}" placeholder="John Doe" @change="${(e)=>this.profileChanged(e)}">
        </div>
        <div class="Country formfield">
            <label class="formLabel" for="country">Country:</label>
            <input class="forminput" type="text" id="country" .value="${this.country}" placeholder="USA" @change="${(e)=> this.profileChanged(e)}">
        </div>
        <div class="Gender formfield">
            <label class="formLabel" for="gender">Gender:</label>
            <select class="forminput" id="gender" .value="${this.gender}" @change="${(e)=> this.profileChanged(e)}">
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="non-binary">Non-Binary</option>
                <option value="other">Other</option>
            </select>
        </div>
        <div class="Button formfield">
            <button class="forminput" id="submitBtn" @click="${this.updateProfileOnCeramic}">Submit</button>
        </div>
        `
        :html`<div class="Country"><h2>You can update your profile when wallet is connected.</h2></div>`
        }
    </div>
    <div class="Basic-Profile BodyContainer">
            <h2>Basic Profile</h2>
            <p id="infoCeramic">Read from Ceramic Datamodel</p>
            <br>
            <p class="ProfileData" id="profileName">${this.name}</p>
            <p class="ProfileData" id="profileGender">${this.country}</p>
            <p class="ProfileData" id="profileCountry">${this.gender}</p>
    </div>
    <div class="Main-Content BodyContainer"></div>
    <div class="Footer BodyContainer">This is the footer...</div>
    `;
  };
  
  async auth() {
    if (window.ethereum == null) {
      throw new Error('No injected Ethereum provider found');
    }
    this.renderRoot.querySelector('#walletBtn').innerHTML = "Connecting..."
    await this.authenticateWithEthereum(window.ethereum);
    this.renderRoot.querySelector('#walletBtn').innerHTML = "Wallet Connected"
    this._loggedIn = true;
    this.renderRoot.querySelector('#infoCeramic').innerHTML = "Reading from Ceramic Network..."
    await this.getProfileFromCeramic();
    this.renderRoot.querySelector('#infoCeramic').innerHTML = "Read from Ceramic Datamodel"
  };

  async getProfileFromCeramic() {
    try {

      //use the DIDDatastore to get profile data from Ceramic
      const profile = await this._datastore.get('BasicProfile');

      this._setProfile(profile);
    } catch (error) {
        console.error(error);
    }
  };

  _setProfile(data) {
    if (!data) return;
    this.name = data.name;
    this.country = data.country;
    this.gender = data.gender;
  };

  async updateProfileOnCeramic() {
    try {
      this.renderRoot.querySelector('#submitBtn').innerHTML = "Updating..."
      const updatedProfile = this.getFormProfile();

      //use the DIDDatastore to merge profile data to Ceramic
      await this._datastore.merge('BasicProfile', updatedProfile);

      //use the DIDDatastore to get profile data from Ceramic
      const profile = await this._datastore.get('BasicProfile')

      this._setProfile(profile);
      
      this.renderRoot.querySelector('#submitBtn').innerHTML = "Submit"

    } catch (error) {
      console.error(error);
    }
  };

  getFormProfile() {
    const name = this.renderRoot.querySelector('#name').value;
    const country = this.renderRoot.querySelector('#country').value;
    const gender = this.renderRoot.querySelector('#gender').value;

    return {
      name,
      country,
      gender
    }
  };

  profileChanged(e) {
    this[e.target.id] == e.target.value ? e.target.className='forminput': e.target.className='unSaved'
  }
}
