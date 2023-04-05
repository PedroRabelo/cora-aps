'use client'

import { KeyboardEvent, useCallback, useState } from 'react';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type Props = {
  title: string;
  createLink?: string;
}

export function PageListHeader({ title, createLink }: Props) {
  const [searchText, setSearchText] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  function handleSearch() {
    router.push(pathname + '?' + createQueryString('search', searchText));
  }

  function handleSearchEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      handleSearch();
    }
  }

  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      </div>
      <div className="flex flex-1 gap-4">
        <div>
          <label htmlFor="search" className="sr-only">
            Pesquisar
          </label>
          <input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="search"
            id="search"
            size={200}
            placeholder="Pesquisar"
            value={searchText}
            onChange={(value) => setSearchText(value.target.value)}
            onKeyDown={(e) => handleSearchEnter(e)}
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => handleSearch()}
        >
          Button text
          <MagnifyingGlassIcon className="-mr-0.5 h-6 w-6" aria-hidden="true" />
        </button>

      </div>
      {createLink &&
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href={createLink}>
            <button
              className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Novo
              <PlusIcon className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      }
    </div>
  );
}
