import React, { useState, useEffect, useRef } from 'react';
import { searchRepo, searchRepoSuccess, searchRepoError } from './npmSearchSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import axios from 'axios'

//Styles 
import { Button, InputStyle } from './npmSearch.styles'


export default function NpmPackageSearch() {


  const [inputVal, setInputVal] = useState('')
  const [isSubmited, setIsSubmited] = useState(false)
  const dispatch = useAppDispatch()

  const searchRepos = async (term: string) => {

    dispatch(searchRepo())
    setIsSubmited(true)

    try {
      const { data } = await axios.get('https://registry.npmjs.org/-/v1/search',
        {
          params: {
            text: term
          }
        }
      )

      const names: string[] = data.objects.map((packages: any) => packages.package.name)
      dispatch(searchRepoSuccess(names))


    } catch (err) {
      dispatch(searchRepoError(err.message))
    }


  }

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    searchRepos(inputVal)

  }
  const npmState = useAppSelector(state => state.reducer.npmReducer)
  const { error, data, loading } = npmState


  return (
    <>
      <form onSubmit={onSubmitForm}>
        <InputStyle
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
        />
        <Button submited={isSubmited}>
          Search
        </Button>
      </form>
      <div>
        {
          isSubmited && error === null && !loading
            //Array 
            ? (data as Array<string>).map((item: string, index: number) => <p key={index}>{item}</p>)
            : error || 'loading'
        }
      </div>
    </>
  )
}