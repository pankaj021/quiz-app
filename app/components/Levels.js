import React from 'react'
import axios from 'axios'
import Main from './Main';

class Levels extends React.Component {
    constructor() {
        super();
        this.state = {
            levelIndex: 0,
            isLoading: true,
            isError: false,
            apiRes: {}
        }
    }
    componentDidMount() {
        let levelIndex = localStorage.getItem('levelIndex');
        !levelIndex && localStorage.setItem("levelIndex", 0);
        levelIndex = Number(levelIndex);
        levelIndex++;
        axios
            .get(`/levels/${levelIndex}`)
            .then(response => {
                this.setState({isLoading: false, isError: false, levelIndex, apiRes: response.data})
            })
            .catch(error => {

                this.setState({isLoading: false, isError: true})
            })
    }

    getLevelList(levelIndex, apiRes) {
        const totalLevels = apiRes.totalLevels;
        let levelList = [];
        for (let index = 1; index <= totalLevels; index++) {
            let className = 'level '
            if (index === levelIndex) {
                className += ' level-active'
            }
            levelList.push(
                <div key={index} className={className}>{`Level${index}`}</div>
            )
        }
        return levelList
    }

    render() {
        const {isError, isLoading, levelIndex, apiRes} = this.state;
        if (isError) 
            return <h1 className="text-ct">Something went wrong...</h1>
        if (isLoading) 
            return <h1 className={"text-ct"}>Please wait a minute...</h1>
        return (
            <div>
                <div className="level-list">
                    {this.getLevelList(levelIndex, apiRes)}
                </div>
                <Main
                    levelIndex={levelIndex}
                    noOfLevels={apiRes.totalLevels}
                    data={apiRes.data}/>
            </div>
        )
    }
}

export default Levels