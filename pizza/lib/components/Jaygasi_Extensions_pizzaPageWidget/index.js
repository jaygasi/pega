import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { withConfiguration, Table } from '@pega/cosmos-react-core';
import { AppAnnouncement as PegaAppAnnouncement } from '@pega/cosmos-react-work';
import './create-nonce';
import StyledJaygasiExtensionsPizzaPageWidgetWrapper from './styles';
// props passed in combination of props from property panel (config.json) and run time props from Constellation
// any default values in config.pros should be set in defaultProps at bottom of this file
function JaygasiExtensionsPizzaPageWidget(props) {
    const { header, description, datasource = [], whatsnewlink, image, getPConnect } = props;
    const [worklist, setWorklist] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const PConnect = getPConnect();
    const dataViewName = 'D_pyMyWorkList';
    const context = PConnect.getContextName();
    let details = [];
    if (datasource && datasource.source) {
        details = datasource.source.map((item) => {
            return item.name;
        });
    }
    // setting up columns for the work list table
    const columns = [
        { renderer: 'caseType', label: PConnect.getLocalizedValue('Case type', '', '') },
        { renderer: 'insKey', label: PConnect.getLocalizedValue('Key', '', '') },
        { renderer: 'status', label: PConnect.getLocalizedValue('Status', '', '') },
        { renderer: 'stage', label: PConnect.getLocalizedValue('Stage', '', '') }
    ];
    // going to get data for worklist to put into a table
    // data comes from calling a PCore function to get
    // get data from a data page and a PConnect function
    // to get getContextName
    useEffect(() => {
        PCore.getDataApiUtils()
            .getData(dataViewName, {}, context)
            .then((response) => {
            setIsLoading(false);
            if (response.data.data !== null) {
                // table requires an index or will get setExtraStackFrame error
                setWorklist(response.data.data.map((entry, index) => {
                    // mapping the data into the column names
                    // MUST have an id/index or will get a setExtraStackFrame error
                    // put a key in the table
                    return {
                        caseType: entry.pxProcessName,
                        insKey: entry.pxRefObjectInsName,
                        status: entry.pyAssignmentStatus,
                        stage: entry.pxTaskLabel,
                        id: index
                    };
                }));
            }
            else {
                setWorklist([]);
                setIsLoading(false);
            }
        })
            .catch((error) => {
            setWorklist([]);
            setIsLoading(false);
            console.log(error);
        });
    }, [context]);
    return (_jsxs(StyledJaygasiExtensionsPizzaPageWidgetWrapper, { children: [_jsx(PegaAppAnnouncement, { heading: header, description: description, details: details, whatsNewLink: whatsnewlink, image: image.replace(/ /g, '+') }), _jsx("br", {}), _jsx(Table, { title: PConnect.getLocalizedValue('Work list', '', ''), columns: columns, data: worklist, loading: isLoading, loadingMessage: PConnect.getLocalizedValue('Loading Work list', '', '') })] }));
}
export default withConfiguration(JaygasiExtensionsPizzaPageWidget);
