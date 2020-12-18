from googleapiclient.discovery import build

def get_youtube(query):
    
    api_key = 'AIzaSyCQEc87jMQT_paCpXjBoQ-NUzSvj5p9vCk'

    youtube = build('youtube', 'v3', developerKey=api_key)

    request = youtube.search().list(
        part="snippet",
        maxResults=25,
        q=query+" diy"
    )
    response = request.execute()
    res = response['items']
    titles = [ e['snippet']['title'] for e in res ]
    thumbnails = [e['snippet']['thumbnails']['high']['url'] for e in res]
    links=[]
    for e in res:
        try:
            links.append('https://www.youtube.com/watch?v='+e['id']['videoId'])
        except:
            links.append('https://www.youtube.com/user/'+e['id']['channelId'])
    jsonOut = []

    for i in range(len(titles)):
        temp = {}
        temp['title'] = titles[i]
        temp['link'] = links[i]
        temp['thumbnail'] = thumbnails[i]
        jsonOut.append(temp)

    return jsonOut

