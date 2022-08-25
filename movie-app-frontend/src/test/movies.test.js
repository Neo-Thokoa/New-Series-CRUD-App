import {render, screen} from '@testing-library/react';
import Movie from "../components/movie.component";

test('App renders first', () => { 
    render(<Movie/>);
    const linkElement = screen.getByText(/Film List/i);
    expect(linkElement).toBeInTheDocument();
 });