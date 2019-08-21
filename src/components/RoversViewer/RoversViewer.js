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

        const {photos, sol, auth} = this.props;

        console.log('curiosity', photos && photos.curiosity);
        console.log('sol', sol && sol.current);
        console.log(sol && `photos.curiosity[${sol.current}]`, photos && sol && photos.curiosity[parseInt(sol.current)]);
        console.log('curiosity', photos && photos.curiosity);

        return (
            <div className={styles.root}>
                <SelectSol minSol={1} maxSol={100} selectedSol={1}/>
                <div className="jss1 jss10 jss20">
                    <div className="jss101 jss105 jss102 jss235">
                        <h2 className="jss133 jss142 jss236">curiosity</h2>
                        <ul className="jss237">
                            {sol && photos.curiosity[parseInt(sol.current)] && photos.curiosity[parseInt(sol.current)].photos.map(
                                v => (<li className="jss262">
                                    <div className="jss263">
                                        <img src={v.img_src}
                                             alt={v.camera.full_name} className="jss264"/>
                                    </div>
                                </li>)
                            )}
                        </ul>
                    </div>
                    <div className="jss101 jss105 jss102 jss235"><h2 className="jss133 jss142 jss236">opportunity</h2>
                        <ul className="jss237">
                            {sol && photos.opportunity[sol.current] && photos.opportunity[sol.current].isLoaded && photos.opportunity[sol.current].photos.map(
                                v => (<li className="jss262">
                                    <div className="jss263">
                                        <img src={v.img_src}
                                             alt={v.camera.full_name} className="jss264"/>
                                    </div>
                                </li>)
                            )}
                        </ul>
                    </div>
                    <div className="jss101 jss105 jss102 jss235"><h2 className="jss133 jss142 jss236">spirit</h2>
                        <ul className="jss237">
                            {sol && photos.spirit[sol.current] && photos.spirit[sol.current].isLoaded && photos.spirit[sol.current].photos.map(
                                v => (<li className="jss262">
                                    <div className="jss263">
                                        <img src={v.img_src}
                                             alt={v.camera.full_name} className="jss264"/>
                                    </div>
                                </li>)
                            )}
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