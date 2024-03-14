from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from pymongo import MongoClient
import time
import re

# Configuración de conexión MongoDB
client = MongoClient('mongodb+srv://estelgarcesext:ZySSfXFqTDN2eKM4@cluster0.mrutfie.mongodb.net/')
db = client['WebScraping']

# Crear la colección TopGeneros si no existe
if 'TopGeneros' not in db.list_collection_names():
    db.create_collection('TopGeneros')

# Referencia a la colección TopGeneros
top_generos = db['TopGeneros']

# Configura las opciones para Chrome
options = Options()
options.add_argument('--ignore-ssl-errors=yes')
options.binary_location = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
# Configura el servicio de Chrome
service = Service(ChromeDriverManager().install())

# Inicializa el driver de Chrome
driver = webdriver.Chrome(service=service, options=options)

# Navega a la página web para recoger el top generos
driver.get('https://www.deezer.com/es/channels/mydeezeryear')

# Espera a que se cargue el contenido dinámico
wait = WebDriverWait(driver, 5000)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'css-1rr4qq7')))

# Obtiene el HTML de la página
html = driver.page_source

# Utiliza BeautifulSoup para analizar el HTML
soup = BeautifulSoup(html, 'lxml')

# Busca el div
div = soup.find_all('div', class_="css-1rr4qq7")

#Da error si no lo encuentra
if len(div) < 2:
    print("Error en el div")
else:
    # Selecciona el segundo elemento de la lista
    div = div[1]

    #Buscamos dentro del div el elemento a
    a_element = div.find('a')

    if a_element is None:
        print("Error en el elemento a")

    else:
        href = a_element.get('href')

        if href is None:
            print("Error en el elemento href")
        else:
            url = 'https://www.deezer.com' + href

            #Entramos en la url
            driver.get(url)

            #Cargamos el contenido
            wait = WebDriverWait(driver, 10000)
            wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'container')))

            # Obtiene el HTML de la página
            html = driver.page_source

            # Utiliza BeautifulSoup para analizar el HTML
            soup = BeautifulSoup(html, 'lxml')

            # Busca el div
            div_albums = soup.find_all('div', class_="container")

            if len(div_albums) < 2:
                print("Error en el div")
            else:
                # Selecciona el segundo elemento de la lista
                div_albums = div_albums[1]

                #Divide los elementos 
                div_elementos = div_albums.find_all('div', class_='thumbnail-caption')

                elementos_mas_1000 = []
                nombres_generos = []
                for div in div_elementos:
                    div_nombreG = div.find('div', class_='heading-4')
                    titulo = re.sub(r'\b2023\b', '', div_nombreG.a['title']).strip()
                
                    #Busca el div donde pone el numero de fans y guarda en numero
                    div_fans = div.find('div', class_="heading-5-sub")
                    text = div_fans.text
                    parts = text.split('-')

                    if len(parts) >= 2:
                        fans_text = parts[1].strip()

                        # Elimina la palabra 'fans' y convierte el número a un entero
                        fans = int(fans_text.replace('fans', '').strip())

                        # Verifica si el número de fans es mayor que 1000
                        if fans >= 1000:
                            # Si es así, guarda el elemento en la lista, el nombre del genero y el numero de fans
                            elementos_mas_1000.append(div)
                            nombres_generos.append(titulo)

                #Tenemos la lista con los albumes que tienen mas de 1000 fans
                for i in range(len(elementos_mas_1000)):
                    album = elementos_mas_1000[i]
                    genero = nombres_generos[i]

                    if genero in db.list_collection_names():
                        print("Coleccion existente")
                    else:
                        # Antes de crear la colección, verifica si el género es "GlobalHits"
                        if genero != 'Global Hits' and genero not in db.list_collection_names():
                            # Antes de crear la colección, añade el nombre del género a la colección TopGeneros
                            top_generos.insert_one({'genero': genero})

                        #Buscamos dentro del div el elemento a
                        a_element = album.find('a')

                        if a_element is None:
                            print("Error en el elemento a")

                        else:
                            href = a_element.get('href')

                            if href is None:
                                print("Error en el elemento href")
                            else:
                                url = 'https://www.deezer.com' + href

                                #Entramos en la url
                                driver.get(url)

                                #Cargamos el contenido
                                wait = WebDriverWait(driver, 10000)
                                wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'ZOZXb')))
                                #Scroll
                                driver.execute_script("window.scrollTo(0, 1);")
                                time.sleep(1)  # Espera un poco para que la página tenga tiempo de cargar el nuevo contenido
                                driver.execute_script("window.scrollTo(0, 0);")
                                time.sleep(1)  # Espera un poco para que la página tenga tiempo de cargar el nuevo contenido

                                # Ahora obtén el código fuente de la página
                                html = driver.page_source

                                # Utiliza BeautifulSoup para analizar el HTML
                                soup = BeautifulSoup(html, 'lxml')

                                # Busca el div donde esta la información de cada cancion
                                div_canciones = soup.find_all('div', class_="JR0qJ")

                                collection = db[genero]
                                
                                if div_canciones:
                                    for div_cancion in div_canciones:
                                        #vamos al album y conseguimos la imagen
                                        div_alb = div_cancion.find('div', class_="RYR7U a42T2 DpnMX twUvF")
                                        if div_alb:
                                            #Buscamos dentro del div el elemento a
                                            a_element = div_alb.find('a')

                                            if a_element is None:
                                                print("Error en el elemento a")
                                            else:
                                                href = a_element.get('href')

                                                if href is None:
                                                    print("Error en el elemento href")
                                                else:
                                                    url = 'https://www.deezer.com' + href

                                                    #Entramos en la url
                                                    driver.get(url)

                                                    #Cargamos el contenido
                                                    wait = WebDriverWait(driver, 10000)
                                                    wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'css-wujoqe')))

                                                    # Ahora obtén el código fuente de la página
                                                    html = driver.page_source

                                                    # Utiliza BeautifulSoup para analizar el HTML
                                                    soup = BeautifulSoup(html, 'lxml')

                                                    # Busca el div donde esta la información de cada cancion
                                                    div_imag = soup.find('div', class_="css-wujoqe")
                                                    if div_imag:
                                                        imag_tag = div_imag.find('img')
                                                        if imag_tag:
                                                            url_imag = imag_tag['src']
                                                        else: url_imag = ""
                                                    else:
                                                        url_imag = ""


                                        #Conseguimos el nombre de las canciones
                                        div_nombreCancion = div_cancion.find('div', class_='XrQj3')
                                        if div_nombreCancion:
                                            span_tag = div_nombreCancion.find('span')
                                            if span_tag:
                                                cancion = span_tag.text.strip()

                                        #Conseguimos el nombre de los artistas
                                        div_nombreArtistas = div_cancion.find('div', class_='RYR7U a42T2 DpnMX')
                                        if div_nombreArtistas:
                                            a_elements = div_nombreArtistas.find_all('a', attrs={'data-testid': 'artist'})
                                            if a_elements:
                                                artistas = ', '.join(a.text for a in a_elements)
                                        
                                        document = {
                                            'imagen': url_imag,
                                            'cancion': cancion,
                                            'artista': artistas
                                        }

                                        # Inserta el documento en la base de datos
                                        collection.insert_one(document) 

                                    
# Navega a la página web para hacer la pagina de home
driver.get('https://www.deezer.com/es/channels/charts')

# Espera a que se cargue el contenido dinámico
wait = WebDriverWait(driver, 5000)
wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'css-1rr4qq7')))

# Obtiene el HTML de la página
html = driver.page_source

# Utiliza BeautifulSoup para analizar el HTML
soup = BeautifulSoup(html, 'lxml')

# Busca el div
div = soup.find('div', class_="heading-4")

#Da error si no lo encuentra
if not div:
    print("Error en el div")
else:
    #Buscamos dentro del div el elemento a
    a_element = div.find('a')

    if a_element is None:
        print("Error en el elemento a")

    else:
        href = a_element.get('href')

        if href is None:
            print("Error en el elemento href")
        else:
            url = 'https://www.deezer.com' + href

            #Entramos en la url
            driver.get(url)

            #Cargamos el contenido
            wait = WebDriverWait(driver, 10000)
            wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'ZOZXb')))
            #Scroll
            driver.execute_script("window.scrollTo(0, 1);")
            time.sleep(1)  # Espera un poco para que la página tenga tiempo de cargar el nuevo contenido
            driver.execute_script("window.scrollTo(0, 0);")
            time.sleep(1)  # Espera un poco para que la página tenga tiempo de cargar el nuevo contenido

            # Obtiene el HTML de la página
            html = driver.page_source

            # Utiliza BeautifulSoup para analizar el HTML
            soup = BeautifulSoup(html, 'lxml')

            # Busca el div
            div_canciones = soup.find_all('div', class_="JR0qJ")

            # Verifica si la colección ya existe
            if "TopWorldwide" not in db.list_collection_names():
                # Si la colección no existe, crea una nueva colección
                collection = db["TopWorldwide"]
                                    
                if div_canciones:
                    for div_cancion in div_canciones:
                        #vamos al album y conseguimos la imagen
                        div_alb = div_cancion.find('div', class_="RYR7U a42T2 DpnMX twUvF")
                        if div_alb:
                            #Buscamos dentro del div el elemento a
                            a_element = div_alb.find('a')

                            if a_element is None:
                                print("Error en el elemento a")
                            else:
                                href = a_element.get('href')

                                if href is None:
                                    print("Error en el elemento href")
                                else:
                                    url = 'https://www.deezer.com' + href

                                    #Entramos en la url
                                    driver.get(url)

                                    #Cargamos el contenido
                                    wait = WebDriverWait(driver, 10000)
                                    wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'css-wujoqe')))

                                    # Ahora obtén el código fuente de la página
                                    html = driver.page_source

                                    # Utiliza BeautifulSoup para analizar el HTML
                                    soup = BeautifulSoup(html, 'lxml')

                                    # Busca el div donde esta la información de cada cancion
                                    div_imag = soup.find('div', class_="css-wujoqe")
                                    if div_imag:
                                        imag_tag = div_imag.find('img')
                                        if imag_tag:
                                            url_imag = imag_tag['src']
                                        else: url_imag = ""
                                    else:
                                        url_imag = ""


                        #Conseguimos el nombre de las canciones
                        div_nombreCancion = div_cancion.find('div', class_='XrQj3')
                        if div_nombreCancion:
                            span_tag = div_nombreCancion.find('span')
                            if span_tag:
                                cancion = span_tag.text.strip()

                        #Conseguimos el nombre de los artistas
                        div_nombreArtistas = div_cancion.find('div', class_='RYR7U a42T2 DpnMX')
                        if div_nombreArtistas:
                            a_elements = div_nombreArtistas.find_all('a', attrs={'data-testid': 'artist'})
                            if a_elements:
                                artistas = ', '.join(a.text for a in a_elements)
                                            
                        document = {
                            'imagen': url_imag,
                            'cancion': cancion,
                            'artista': artistas
                        }

                        # Inserta el documento en la base de datos
                        collection.insert_one(document) 

                    # Lista de sufijos de URL
sufijos = ["1970s", "1980s", "1990s", "2000s", "2010s"]

for sufijo in sufijos:

    print(sufijo)
    # Navega a la página web para hacer la pagina de home
    driver.get(f'https://www.deezer.com/es/channels/{sufijo}')

    # Espera a que se cargue el contenido dinámico
    wait = WebDriverWait(driver, 5000)
    wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'css-1rr4qq7')))

    # Obtiene el HTML de la página
    html = driver.page_source

    # Utiliza BeautifulSoup para analizar el HTML
    soup = BeautifulSoup(html, 'lxml')

    if sufijo == "1980s":
        div_index = 1  # Si es 1980s, busca el segundo div
    else:
        div_index = 0  # Si es otro sufijo, busca el primer div

    # Busca el div correspondiente
    divs = soup.find_all('div', class_="heading-4")

    #Da error si no lo encuentra
    if len(divs) < 2:
        print("Error en el div")
    else:
        div = divs[div_index]

        #Buscamos dentro del div el elemento a
        a_element = div.find('a')

        if a_element is None:
            print("Error en el elemento a")

        else:
            href = a_element.get('href')

            if href is None:
                print("Error en el elemento href")
            else:
                url = 'https://www.deezer.com' + href

                #Entramos en la url
                driver.get(url)

                #Cargamos el contenido
                wait = WebDriverWait(driver, 10000)
                wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'ZOZXb')))
                #Scroll
                driver.execute_script("window.scrollTo(0, 1);")
                time.sleep(1)  # Espera un poco para que la página tenga tiempo de cargar el nuevo contenido
                driver.execute_script("window.scrollTo(0, 0);")
                time.sleep(1)  # Espera un poco para que la página tenga tiempo de cargar el nuevo contenido

                # Obtiene el HTML de la página
                html = driver.page_source

                # Utiliza BeautifulSoup para analizar el HTML
                soup = BeautifulSoup(html, 'lxml')

                # Busca el div
                div_canciones = soup.find_all('div', class_="JR0qJ")

                # Verifica si la colección ya existe
                if sufijo not in db.list_collection_names():
                    # Si la colección no existe, crea una nueva colección
                    collection = db[sufijo]
                                        
                    if div_canciones:
                        for div_cancion in div_canciones:
                            #vamos al album y conseguimos la imagen
                            div_alb = div_cancion.find('div', class_="RYR7U a42T2 DpnMX twUvF")
                            if div_alb:
                                #Buscamos dentro del div el elemento a
                                a_element = div_alb.find('a')

                                if a_element is None:
                                    print("Error en el elemento a")
                                else:
                                    href = a_element.get('href')

                                    if href is None:
                                        print("Error en el elemento href")
                                    else:
                                        url = 'https://www.deezer.com' + href

                                        #Entramos en la url
                                        driver.get(url)

                                        #Cargamos el contenido
                                        wait = WebDriverWait(driver, 10000)
                                        wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'css-wujoqe')))

                                        # Ahora obtén el código fuente de la página
                                        html = driver.page_source

                                        # Utiliza BeautifulSoup para analizar el HTML
                                        soup = BeautifulSoup(html, 'lxml')

                                        # Busca el div donde esta la información de cada cancion
                                        div_imag = soup.find('div', class_="css-wujoqe")
                                        if div_imag:
                                            imag_tag = div_imag.find('img')
                                            if imag_tag:
                                                url_imag = imag_tag['src']
                                            else: url_imag = ""
                                        else:
                                            url_imag = ""

                            #Conseguimos el nombre de las canciones
                            div_nombreCancion = div_cancion.find('div', class_='XrQj3')
                            if div_nombreCancion:
                                span_tag = div_nombreCancion.find('span')
                                if span_tag:
                                    cancion = span_tag.text.strip()

                            #Conseguimos el nombre de los artistas
                            div_nombreArtistas = div_cancion.find('div', class_='RYR7U a42T2 DpnMX')
                            if div_nombreArtistas:
                                a_elements = div_nombreArtistas.find_all('a', attrs={'data-testid': 'artist'})
                                if a_elements:
                                    artistas = ', '.join(a.text for a in a_elements)
                                                
                            document = {
                                'imagen': url_imag,
                                'cancion': cancion,
                                'artista': artistas
                            }

                            # Inserta el documento en la base de datos
                            collection.insert_one(document) 
                
# Cierra el navegador
driver.quit()
