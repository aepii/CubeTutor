import requests
import json
from bs4 import BeautifulSoup


class ScrapeSpeedCubeDB:

    def __init__(self):

        self.all_algorithms = {}
        self.file = None

    def write_data(self, algorithm_sets):

        print("[CubeTutor] Scraping algorithms from SpeedCubeDB.")

        for algorithm_set in algorithm_sets:

            self.all_algorithms[algorithm_set] = {}

            url = "https://www.speedcubedb.com/a/3x3/" + algorithm_set
            res = requests.get(url)
            soup = BeautifulSoup(res.content, 'html.parser')

            datas = soup.select('div.singlealgorithm')

            for index, data in enumerate(datas):

                case = data.get('data-alg')
                sub_group = data.get('data-subgroup')

                self.all_algorithms[algorithm_set][case] = {}
                self.all_algorithms[algorithm_set][case]["Sub Group"] = sub_group

                group_algorithms = data.find_all('li', attrs={'class': 'list-group-item'})

                for index, algorithm in enumerate(group_algorithms):
                    self.all_algorithms[algorithm_set][case]["Alg" + str(index + 1)] = algorithm.find("div").text

                if algorithm_set != "F2L":
                    face_colors = data.find('div', class_='jcube')
                    data_ub = face_colors['data-ub']
                    data_uf = face_colors['data-uf']
                    data_ul = face_colors['data-ul']
                    data_ur = face_colors['data-ur']
                    data_us = face_colors['data-us']
                    combined_face_colors = data_ub + data_uf + data_ul + data_ur + data_us
                else:
                    face_colors = data.find('div', class_='icube')
                    combined_face_colors = face_colors["data-fl"]

                self.all_algorithms[algorithm_set][case]["Colors"] = combined_face_colors

        algorithms_json = json.dumps(self.all_algorithms, indent=4)

        with open("src/web_scraper/algorithms.json", "w") as outfile:
            outfile.write(algorithms_json)
            self.file = outfile
            print("[CubeTutor] Finished scraping!")

    def get_data(self, algorithm_set):

        return self.file[algorithm_set]
    
def main():
    scraped_data = ScrapeSpeedCubeDB()
    scraped_data = scraped_data.write_data(["PLL", "OLL", "F2L"])
    

if __name__ == "__main__":
    main()