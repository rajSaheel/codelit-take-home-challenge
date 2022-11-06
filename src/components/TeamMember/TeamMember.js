import React from 'react';
import PropTypes from 'prop-types';
import './TeamMember.css';
import CodelitEmptyAvatar from '../../assets/codelit_empty_avatar.svg';

export class NewMemberForm extends React.PureComponent{
  static propTypes={
    handleForm:PropTypes.func,
    handleCancel:PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName:null,
      lastName:null,
      title:null,
      story:null,
      color:"#000",
      photo:CodelitEmptyAvatar,
    };
  }

  handleChange=e=> this.setState({[e.target.name]:e.target.value})

  submitForm=()=>{
    this.props.handleSubmit(this.state);
  }

  render(){
    return(
      <div className='form-container'>
        <span id="form-heading">New Member Form</span>
        <span id="line-break"></span>
        <form method='post' name="new-member-form">
          <div className='form-field'>
          <label htmlFor="firsName">First Name</label>
          <input name="firstName" type={"text"} onChange={this.handleChange} required></input>
          </div>
          <div className='form-field'>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type={"text"} onChange={this.handleChange} required></input>
          </div>
          <div className='form-field'>
          <label htmlFor="title">Title</label>
          <input name="title" type={"text"} onChange={this.handleChange} required></input>
          </div>
          <div className='form-field'>
          <label htmlFor="story">Story</label>
          <textarea name="story" type={""} onChange={this.handleChange} required></textarea>
          </div>
          <div className='form-field'>
          <label htmlFor="color">Favourite Color</label>
          <input name="color" type={"color"} onChange={this.handleChange}></input>
          </div>
          <div className='form-field'>
          <label htmlFor="photo">Photo</label>
          <input name='photo' type={"file"}></input>
          </div>
          <div className='form-button'>
          <input type={"button"} value="Submit" onClick={this.submitForm}></input>
          <input type={"button"} value="Cancel" onClick={this.props.handleCancel}></input>
          </div>
        </form>
      </div>
    )
  }
}

class TeamMember extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    story: PropTypes.string,
    favoriteColor: PropTypes.string,
    isNewCard:PropTypes.bool,
    handleForm:PropTypes.func
  };

  static defaultProps = {
    photoUrl: CodelitEmptyAvatar,
    story: null,
    favoriteColor: '#3466F2'
  };

  render() {
    return (
      <div className="container">
        <header>
          <div className="avatar-container">
            <img
              className="avatar"
              src={this.props.photoUrl}
              alt={this.props.name}
            />
          </div>
          <h2 className="title">{this.props.title}</h2>
          <h1 className="name">{this.props.name}</h1>
        </header>
        <div className="body">{this.props.story}</div>
        {(this.props.isNewCard)&&<span id="join-team-btn"onClick={this.props.handleForm}>Join the Team</span>}
        <footer style={{ backgroundColor: this.props.favoriteColor }}>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box stat">9.0</div>
            <div className="one-third-flex-box stat bordered">9.0</div>
            <div className="one-third-flex-box stat">9.0</div>
          </div>
          <div className="full-width-flex-box">
            <div className="one-third-flex-box">CANDID</div>
            <div className="one-third-flex-box">LEARNING</div>
            <div className="one-third-flex-box">GRIT</div>
          </div>
        </footer>
      </div>
    );
  }
}

export default TeamMember;