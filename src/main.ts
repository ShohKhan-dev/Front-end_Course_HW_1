const email: string = "s.khamrakulov@innopolis.university";
const urlParams: URLSearchParams = new URLSearchParams({ email });
const apiUrl: string = `https://fwd.innopolis.app/api/hw2?${urlParams}`;
const refresh_button: HTMLElement | null = document.getElementById("refresh-comics-button");

interface ComicData {
    img: string;
    title: string;
    alt: string;
    year: number;
    month: number;
    day: number;
}

function fetchComics(): void {
  fetch(apiUrl)
    .then((response: Response): Promise<number> => response.json())
    .then((data: number): Promise<Response> => {
      const comicId: number = data;
      const xkcdUrl: string = `https://getxkcd.vercel.app/api/comic?num=${comicId}`;
      return fetch(xkcdUrl);
    })
    .then((response: Response): Promise<ComicData> => response.json())
    .then((data: ComicData): void => {
      const comic: string = data.img;
      const title: string = data.title;
      const alt: string = data.alt;
      const date: Date = new Date(data.year, data.month - 1, data.day);

      const comicImg = document.getElementById("comic") as HTMLImageElement;
      const altDiv: HTMLElement | null = document.getElementById("alt");
      const titleDiv: HTMLElement | null = document.getElementById("title");
      const dateDiv: HTMLElement | null = document.getElementById("date");

      if (comicImg !== null && altDiv !== null && titleDiv !== null && dateDiv !== null) {
        comicImg.src = comic;
        comicImg.alt = alt;
        titleDiv.textContent = title;
        dateDiv.textContent = `Published on: ${date.toLocaleDateString()}`;
        altDiv.textContent = `Note: ${alt}`;
      }
    })
    .catch((error: Error): void => {
      console.error("Error:", error);
    });
}


window.onload = (() => {
    fetchComics();
});

refresh_button?.addEventListener("click", fetchComics);