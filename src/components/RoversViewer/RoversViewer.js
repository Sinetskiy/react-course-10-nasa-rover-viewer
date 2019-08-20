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


class RoversViewer extends PureComponent {

    render() {

        const { isLoading} = this.props;

        console.log(this.props);

        if (isLoading)
            return (<p>Загрузка</p>);

        return (
            <div className={styles.root}>
                <SelectSol minSol={1} maxSol={100} selectedSol={1}/>
                <div className="jss1 jss10 jss20">
                    <div className="jss101 jss105 jss102 jss235">
                        <h2 className="jss133 jss142 jss236">curiosity</h2>
                        <ul className="jss237" >
                            <li className="jss262" >
                                <div className="jss263"><img
                                    src="http://mars.jpl.nasa.gov/msl-raw-images/msss/00001/mcam/0001ML0000001000I1_DXXX.jpg"
                                    alt="Mast Camera" className="jss264" /></div>
                            </li>
                        </ul>
                    </div>
                    <div className="jss101 jss105 jss102 jss235"><h2 className="jss133 jss142 jss236">opportunity</h2>
                        <ul className="jss237" >
                            <li className="jss262" >
                                <div className="jss263"><img
                                    src="http://mars.nasa.gov/mer/gallery/all/1/f/001/1F128285236EDN0000P1001L0M1-BR.JPG"
                                    alt="Front Hazard Avoidance Camera" className="jss264" /></div>
                            </li>

                        </ul>
                    </div>
                    <div className="jss101 jss105 jss102 jss235"><h2 className="jss133 jss142 jss236">spirit</h2>
                        <ul className="jss237" >
                            <li className="jss262" >
                                <div className="jss263"><img
                                    src="http://mars.nasa.gov/mer/gallery/all/2/f/001/2F126468064EDN0000P1001L0M1-BR.JPG"
                                    alt="Front Hazard Avoidance Camera" className="jss265" /></div>
                            </li>
                        </ul>
                    </div>
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