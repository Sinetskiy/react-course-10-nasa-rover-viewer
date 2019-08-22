// Здесь вам нужно реализовать вью

// Подключите его к редакс роутеру
// Вам потребуются селекторы для получения выбранного сола
// и списка фотографий

// Так же вы будете диспатчить экшены CHANGE_SOL и FETCH_PHOTOS_REQUEST
// Эти экшены находятся в модуле ROVER PHOTOS

import React, {PureComponent} from 'react';
import styles from './RoversViewer.module.css'
import {fetchPhotosRequest, fetchPhotosFailure, fetchPhotosSuccess} from '../../modules/RoverPhotos';
import {connect} from 'react-redux';
import SelectSol from "../SelectSol";
import RoverPhotos from "../RoverPhotos";

class RoversViewer extends PureComponent {

    render() {

        const {photos} = this.props;
        const sol = this.props.sol || {current: 1};

        return (
            <div className={styles.root}>
                <SelectSol minSol={1} maxSol={100} selectedSol={1}/>
                <div className={styles.сontainer}>
                    {sol && photos.curiosity[sol.current] && photos.curiosity[sol.current].isLoaded ?
                        <RoverPhotos name='curiosity' photos={photos.curiosity[sol.current].photos}/> : ''}
                    {sol && photos.opportunity[sol.current] && photos.opportunity[sol.current].isLoaded ?
                        <RoverPhotos name='opportunity' photos={photos.opportunity[sol.current].photos}/> : ''}
                    {sol && photos.spirit[sol.current] && photos.spirit[sol.current].isLoaded ?
                        <RoverPhotos name='spirit' photos={photos.spirit[sol.current].photos}/> : ''}
                </div>
            </div>
        );
    }
}

export default connect(state => ({...state.roverPhotos}), {
    fetchPhotosRequest,
    fetchPhotosFailure,
    fetchPhotosSuccess
})(RoversViewer);