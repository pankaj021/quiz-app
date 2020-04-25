import React from 'react';

class Popup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 'start',
            title: `Level${props.levelIndex}`,
            text: 'This is a quiz application built using ReactJS. <br /><br /> Currently it\'s loa' +
                    'ded with CSS questions from W3Scools, but you can easily load any type of questi' +
                    'ons into it. <br /><br /> It will dynamically load the question->answers pair an' +
                    'd upload them into the components.',
            buttonText: 'Start the quiz'
        };

        this.popupHandle = this
            .popupHandle
            .bind(this);
    }

    popupHandle() {
        let {time} = this.state;
        let levelIndex = localStorage.getItem('levelIndex')
        let {noOfLevels} = this.props;
        if (time === 'start') {
            this.setState({time: 'end', title: 'Congratulations!', buttonText: 'Next Level'});
            this
                .props
                .startQuiz();
        } else {
            const nextIndex = (levelIndex + 1) % (noOfLevels);
            localStorage.setItem("levelIndex", nextIndex)
            location.reload(); // restart the application
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: 'You have completed the quiz. <br /> You got: <strong>' + this.props.score + '</strong> out of <strong>' + this.props.total + '</strong> questions right.'
        })
    }

    createMarkup(text) {
        return {__html: text};
    }

    render() {

        let {title, text, buttonText} = this.state;

        let {style} = this.props;

        return (
            <div className="popup-container" style={style}>
                <div className="container">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="popup">
                            <h1>{title}</h1>
                            <p dangerouslySetInnerHTML={this.createMarkup(text)}/>
                            <button className="fancy-btn" onClick={this.popupHandle}>{buttonText}</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup
