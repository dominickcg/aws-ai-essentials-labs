---
inclusion: always
---

# AWS Lab Documentation Guidelines

Rules for creating AWS lab documentation in shared environments.

## Language and Localization

**CRITICAL: Write all documentation in Spanish**
- README files, guides, instructions, and descriptions must be in Spanish
- Code, API names, technical parameters, and AWS service names remain in English
- Use AWS Console Spanish interface terminology consistently, including:
  - "Instancias" (not "Instances")
  - "Pilas" (not "Stacks")
  - "Ejecutar" (not "Launch")
  - "Grupos de seguridad" (not "Security Groups")
  - "Balanceador de carga" (not "Load Balancer")
  - "Almacenamiento" (not "Storage")

Examples of correct usage:
- ✓ "Abra la consola de EC2 y haga clic en **Lanzar instancia**"
- ✓ "El parámetro `TipoDeInstancia` define el tipo de instancia"
- ✓ "Verifique que el estado sea `ejecutándose`"

## Resource Naming Convention

**CRITICAL: All AWS resources MUST include participant name suffix**
- Pattern: `{resource-type}-{description}-{participant-name}` (lowercase)
- Examples:
  - `ec2-webserver-luis`
  - `s3-bucket-data-maria`
  - `vpc-carlos`
  - `sg-web-ana`
- When writing instructions, use placeholder: `{nombre-participante}`
- Example instruction: "Nombre: `ec2-webserver-{nombre-participante}`"

**CRITICAL: Shared Resource Protection**
- Never modify or delete resources without your participant name suffix
- Never recreate instructor-provided shared resources (VPCs, IAM roles, etc.)
- Clearly mark shared resources in documentation as "Recurso compartido - NO modificar"

## Documentation Structure

### Main README (`README.md`)
Must contain:
1. Main title with single emoji ("☁️ AWS AI Essentials")
2. Overall description
3. Learning objectives summary
4. Prerequisites or dependencies
5. Labs on a table with lab number (links to lab folders), title , description, estimated time
6. Additional content (AWS Documentation, AWS Skill Builder, AWS Certification, community)
7. Contributions
8. License (MIT): "Este proyecto está licenciado bajo la Licencia MIT. Copyright © 2026 AMBER CLOUD GLOBAL LLC".

### Lab-specific README (`lab-X-{topic}/README.md`)
Must contain:
1. Lab title with single emoji (e.g., "🌐 Laboratorio 1: Creación de VPC")
2. Table of contents (índice) with anchor links to each section
3. Estimated completion time
4. Learning objectives (2-4 bullet points)
5. Prerequisites section listing required resources
6. Numbered step-by-step instructions
7. Visual verification checkpoints after each major step
8. Reference to separate troubleshooting document
9. Reference to separate cleanup instructions or note about resource lifecycle

### Support Files Organization
Create separate files for:
- User Data scripts: `user-data.sh`
- IAM policies: `{policy-name}-policy.json`
- Web assets: organized in `sitio-web-{topic}/` folder with `assets/`, `css/`, `js/` subfolders
- Configuration files: descriptive names like `bucket-policy.json`
- Other support files that participants must use for each lab

Reference support files explicitly in instructions:
- "Copie el contenido del archivo `user-data.sh` ubicado en esta carpeta"
- "Utilice la política IAM del archivo `bucket-policy.json`"

## Writing Instructions

### Region Verification
**CRITICAL: Every lab README must start with region verification**
```markdown
1. Verifique que está trabajando en la región correcta:
   - En la esquina superior derecha de la consola de AWS
   - Confirme que dice la región estipulada por el instructor
   - Si no es correcta, haga clic y seleccione la región indicada
```

### Console Navigation
Be explicit about UI locations:
- "En el panel de navegación de la izquierda, haga clic en..."
- "En la esquina superior derecha, haga clic en el botón naranja **Crear**"
- "En la pestaña **Configuración**, desplácese hasta la sección..."
- "Utilice la barra de búsqueda global (parte superior) y escriba el nombre del servicio"

### Step Formatting
Use numbered lists for sequential steps:
```markdown
1. Abra la consola de EC2
2. En el panel izquierdo, haga clic en **Instancias**
3. Haga clic en el botón naranja **Lanzar instancia**
```

Use sub-bullets for configuration details within a step:
```markdown
4. Configure los siguientes parámetros:
   - **Nombre**: `ec2-webserver-{nombre-participante}`
   - **AMI**: Amazon Linux 2023
   - **Tipo de instancia**: t2.micro
   - **Par de claves**: Seleccione su par de claves existente
```

### Visual Verification
Add verification checkpoints after resource creation:
```markdown
**✓ Verificación**: En la lista de instancias, confirme que:
- El estado de la instancia es **En ejecución** (verde)
- La columna **Comprobaciones de estado** muestra "2/2 comprobaciones aprobadas"
```

### Resource Dependencies
Clearly indicate wait times and dependencies:
```markdown
⏱️ **Nota**: La base de datos RDS puede tardar 10-15 minutos en estar disponible.

**Mientras espera**, puede continuar con el Paso 5 para configurar el Security Group.

⚠️ **No proceda al Paso 8** hasta que el estado de la base de datos sea **Disponible**.
```

## Technical Level and Tone

- Target audience: AWS Certified Cloud Practitioner level
- Use clear, fundamental explanations without excessive jargon
- When introducing AWS concepts, provide brief context:
  - "Un Security Group actúa como un firewall virtual que controla el tráfico..."
- Focus on AWS Console (GUI) operations
- Only include CLI or IaC (CloudFormation, Terraform) if explicitly required by design

## Emoji Usage Rules

**CRITICAL: Restrict emoji usage**
- Use ONLY ONE emoji at the start of main README titles
- Examples: "🌐 Laboratorio 1.1", "☁️ Día 2", "🔒 Laboratorio 2.3"
- NEVER use emojis in:
  - Body text or step-by-step instructions
  - Code files (HTML, CSS, JavaScript, JSON)
  - Configuration parameters
  - Resource names
- Exception: Use ⏱️ for wait time notes, ⚠️ for critical warnings, ✓ for verification checkpoints

## Troubleshooting and Error Handling

### Lab README Troubleshooting Section
At the end of each lab README, include:
```markdown
## Solución de Problemas

Si encuentra dificultades durante este laboratorio, consulte la [Guía de Solución de Problemas](../TROUBLESHOOTING.md) que contiene soluciones a errores comunes.

**Errores que requieren asistencia del instructor:**
- Errores de permisos IAM
- Errores de límites de cuota de AWS
```

### Separate TROUBLESHOOTING.md
Create `dia-X/TROUBLESHOOTING.md` with:
- Common error scenarios organized by lab
- Symptoms, causes, and solutions
- Console screenshots or error message examples
- Example:
```markdown
### Error: No se puede conectar por SSH a la instancia EC2

**Síntoma**: Timeout al intentar conectar por SSH

**Causas posibles**:
1. El Security Group no tiene el puerto 22 abierto
2. La instancia no tiene IP pública asignada
3. El par de claves no coincide

**Solución**:
1. Verifique el Security Group...
```

### Permission and Quota Errors
**CRITICAL: Never attempt workarounds for these errors**
- Instruct participant to notify instructor immediately
- Example: "⚠️ Si recibe un error de permisos, notifique al instructor de inmediato. No intente solucionar este error por su cuenta."

## Resource Lifecycle Management

### During Lab Instructions
Specify if resources should remain active:
```markdown
⚠️ **Importante**: NO elimine esta instancia EC2 al finalizar. La utilizaremos en el laboratorio del Día 2.
```

### Cleanup Instructions
At the end of each day, provide optional cleanup README (`dia-X/limpieza/README.md`):
```markdown
# 🧹 Limpieza de Recursos - Día 1 (Opcional)

**Nota**: Esta limpieza es opcional. Solo realícela si no continuará con el Laboratorio 2.

## Recursos a Eliminar

1. **Instancias EC2**
   - Navegue a EC2 > Instancias
   - Seleccione las instancias con su nombre de participante
   - Acciones > Estado de la instancia > Terminar instancia

2. **Buckets S3**
   - Navegue a S3
   - Seleccione el bucket `s3-sitio-web-{nombre-participante}`
   - Primero vacíe el bucket, luego elimínelo
```

## Content Validation with AWS Documentation

**CRITICAL: All lab content must be validated against official AWS documentation**

When working on spec tasks that create lab content (guides, support files, configurations):
- In the final validation tasks of each spec, use the AWS Documentation MCP server to verify:
  - Service configurations match current AWS best practices
  - Console navigation steps reflect the latest AWS Console UI
  - Parameter names and values are accurate and up-to-date
  - Spanish terminology aligns with official AWS documentation
  - Security and compliance recommendations are current
- Search AWS documentation for the specific services and access methods used in the lab
- Cross-reference instructions with official AWS user and developer guides
- Update any outdated information discovered during validation
- Document any deviations from AWS recommendations with justification

This validation ensures lab accuracy and prevents participant confusion due to outdated or incorrect information.

## Git Version Control

**CRITICAL: NUNCA ejecutar comandos de control de versiones**
- NUNCA ejecutar `git add`, `git commit`, `git push`, `git tag` ni ningún otro comando que implique registrar, confirmar o publicar cambios en el repositorio
- El control de versiones es responsabilidad exclusiva del usuario
- Si se necesita un `git mv` para renombrar/mover archivos como parte de una tarea, eso sí está permitido ya que es una operación de sistema de archivos, no de registro de cambios

## AI Assistant Execution Checklist

When generating or updating lab documentation, follow this sequence:

1. **Start with region verification step** in every lab README
2. **Use numbered lists** for all sequential instructions
3. **Include wait time estimates** for slow-provisioning resources (RDS, ELB, NAT Gateway)
4. **Add visual verification checkpoints** after each resource creation
5. **Reference support files** by exact filename with relative path
6. **Create separate troubleshooting document** (never inline full troubleshooting)
7. **Specify resource lifecycle** (keep for next day vs. terminate)
8. **Add table of contents** (índice) to lab READMEs with anchor links
9. **Use participant name placeholder** `{nombre-participante}` in all resource naming examples
10. **Validate Spanish terminology** matches AWS Console Spanish interface
11. **Validate all content with AWS Documentation MCP server** in final spec tasks