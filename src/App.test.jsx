
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'

vi.mock('./services/movieService', () => ({
  searchMovies: vi.fn(),
}))

import { searchMovies } from './services/movieService'

describe('MovieHub App', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('displays the MovieHub heading and popular movies', () => {
    render(<App />)

    expect(screen.getByText('MovieHub')).toBeInTheDocument()
    expect(screen.getByText('Discover Your Next Favorite Movie')).toBeInTheDocument()
    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByText('Interstellar')).toBeInTheDocument()
  })

  it('shows an error when searching with an empty input', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByText('Please enter a movie name.')).toBeInTheDocument()
  })

  it('displays search results when movies are found', async () => {
    searchMovies.mockResolvedValue([
      {
        id: 101,
        title: 'Batman',
        year: '2022',
        genre: 'Movie',
        rating: '8.5/10',
        description: 'A superhero movie',
        poster: '',
      },
    ])

    render(<App />)

    fireEvent.change(screen.getByPlaceholderText('Search for a movie...'), {
      target: { value: 'Batman' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(await screen.findByText('Batman')).toBeInTheDocument()
  })

  it('adds a movie to favorites', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', {
      name: 'Add to favorites',
    })[0])

    fireEvent.click(screen.getByRole('button', {
      name: /My Favorites/,
    }))

    expect(screen.getByText('Inception')).toBeInTheDocument()
    expect(screen.getByRole('button', {
      name: 'Remove from favorites',
    })).toBeInTheDocument()
  })

  it('opens movie details', () => {
    render(<App />)

    fireEvent.click(screen.getAllByRole('button', {
      name: 'View Details',
    })[0])

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByRole('button', {
      name: /Back to movies/,
    })).toBeInTheDocument()
  })

  it('displays an error when the movie search fails', async () => {
    searchMovies.mockRejectedValue(
      new Error('Unable to connect to TMDB. Please try again.')
    )

    render(<App />)

    fireEvent.change(screen.getByPlaceholderText('Search for a movie...'), {
      target: { value: 'Batman' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(screen.getByText(
        'Unable to connect to TMDB. Please try again.'
      )).toBeInTheDocument()
    })
  })
})
