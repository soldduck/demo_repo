import React, { useState } from 'react';
import { connect } from 'react-redux';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { updateSearchParameter, updateSearchedBooks } from '../store/actionCreators/searchActionsCreators';
import search from '../utils/searchRequest';

import store from '../store/store'


const renderDictCombobox = (i, props, update) => {
    let values = ["Автор","Заглавие","Ключевые слова","Дата издания"]
    return <NativeSelect
            defaultValue ={props["tab_" + i]}
            onChange={update}
            inputProps={{
              id: 'tab_'+i,
            }}
          >
              <option>Автор</option>
              <option>Заглавие</option>
              <option>Ключевые слова</option>
              <option>Дата издания</option>
           </NativeSelect>
}

const renderCondCombobox = (i, props, update) => {
    return <NativeSelect
        defaultValue={props['condAfter_' + i]}
        onChange={update}
        inputProps={{
        id: 'condAfter_' + i,
        }}
        >
            <option value = "1" >И</option>
            <option value = "2">ИЛИ</option>
            <option value = "3">И НЕ</option>
        </NativeSelect>
}

function SearchForm (props) {

    const [loading, setLoading] = useState(false);

    const handleValueChanged = (e) => {
        e.preventDefault();
        let searchParam = {
            name: e.target.id,
            value: e.target.value
        }
        props.updateSearchParam(searchParam);
    }

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        let token = props.token;
        let request = configureSearchRequest();
        let books = await search(request, token);
        props.updateBooks(books);
        setLoading(false)
    }

    const configureSearchRequest = () => {
        let params = store.getState().searchParameters; //???
        var request = {
          fond : "MSCIENCE",
          searchParameters : [
            {
                tab: params.tab_1,
                word: "%" + params.word_1.toLowerCase() + "%",
                condAfter: params.condAfter_1
            },
            {
                tab: params.tab_2,
                word: "%" + params.word_2.toLowerCase() + "%",
                condAfter: params.condAfter_2
            },
            {
                tab: params.tab_3,
                word: "%" + params.word_3.toLowerCase() + "%",
                condAfter: params.condAfter_3
            },
            {
                tab: params.tab_4,
                word: "%" + params.word_4.toLowerCase() + "%",
                condAfter: "0"
            }
          ]
        }
        return request;
    }

    return(
        <form onSubmit={handleSearch} noValidate autoComplete="off">
            <Grid 
                container 
                justify="center"
                alignItems="center"
                direction="row"
                spacing={2}
                >
                <Grid item>
                    {renderDictCombobox(1, props, handleValueChanged)}
                </Grid>
                <Grid item sm={6}>
                    <TextField 
                        variant="outlined"
                        id="word_1" 
                        defaultValue={props.word_1}
                        onChange={handleValueChanged}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item sm={1}>
                    {renderCondCombobox(1, props, handleValueChanged)}
                </Grid>
            </Grid>
            <Grid 
                container 
                justify="center"
                alignItems="center"
                direction="row"
                spacing={2}
                >
                <Grid item>
                    {renderDictCombobox(2, props, handleValueChanged)}
                </Grid>
                <Grid item sm={6}>
                    <TextField 
                        variant="outlined"
                        id = "word_2"
                        defaultValue={props.word_2}
                        onChange={handleValueChanged}
                        style={{ width: '100%' }}
                    />
                </Grid>
                <Grid item sm={1}>
                    {renderCondCombobox(2, props, handleValueChanged)}
                </Grid>
            </Grid>
            <Grid 
                container 
                justify="center"
                alignItems="center"
                direction="row"
                spacing={2}
                >
                <Grid item>
                    {renderDictCombobox(3, props, handleValueChanged)}
                </Grid>
                <Grid item sm={6}>
                    <TextField variant="outlined"
                        id = "word_3"
                        defaultValue={props.word_3}
                        onChange={handleValueChanged}
                        style={{ width: '100%'}}
                    />
                </Grid>
                <Grid item sm={1}>
                    {renderCondCombobox(3, props, handleValueChanged)}
                </Grid>
            </Grid>
            <Grid 
                container 
                justify="center"
                alignItems="center"
                direction="row"
                spacing={2}
                >
                <Grid item >
                    {renderDictCombobox(4, props, handleValueChanged)}
                </Grid>
                <Grid item sm={6}>
                    <TextField variant="outlined"
                        id = "word_4"
                        defaultValue={props.word_4}
                        onChange={handleValueChanged}
                        style={{ width: '100%'}}
                    />
                </Grid>
                <Grid item sm={1} >
                    <Button disabled={loading} type="submit" variant="outlined" color="primary">
                        {loading ? <CircularProgress size={24} /> : "Найти"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        ...state.searchParameters 
    }
};

const mapDicpatchToProps = (dispatch) => {
    return {
        updateSearchParam: (param) => {
            dispatch(updateSearchParameter(param));
        },
        updateBooks: (books) => {
            dispatch(updateSearchedBooks(books));
        }
    }
};

export default connect(mapStateToProps, mapDicpatchToProps)(SearchForm);