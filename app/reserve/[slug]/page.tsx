import React from 'react'
import Header from './components/Header'
import ResDetailsForm from './components/ResDetailsForm'
import { fetchRestaurntBySlug } from '../../restaurant/[slug]/page';

interface Props {
  params: { slug: string }
  searchParams: { date: string, partySize: string }
}

export default async function ResevePage({ params, searchParams }: Props) {
  const restaurant = await fetchRestaurntBySlug(params.slug)

  return (
    <div className="border-t h-screen">
      <div className="sm:py-9 p-3 md:w-3/5 sm:w-5/6 w-full m-auto">
        <Header
          day={searchParams.date.split('T')[0]}
          time={searchParams.date.split('T')[1]}
          partySize={searchParams.partySize}
          restaurant={restaurant}
        />
        <ResDetailsForm
          searchParams={searchParams}
          slug={params.slug} 
          restaurant={restaurant}
          />
      </div>
    </div>
  )
}
