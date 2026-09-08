import os

raiz = os.path.abspath(os.getcwd())

print("RUTA:")
print(raiz)
print("\nARCHIVOS:")

for ruta, carpetas, archivos in os.walk(raiz):
    nivel = ruta.replace(raiz, "").count(os.sep)
    prefijo = "    " * nivel
    print(f"{prefijo}{os.path.basename(ruta)}/")

    for archivo in archivos:
        print(f"{prefijo}    {archivo}")