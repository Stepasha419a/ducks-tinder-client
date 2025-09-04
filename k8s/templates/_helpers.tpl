{{/*
Application name.
*/}}
{{- define "ducks-tinder-client.app.name" -}}
frontend-app
{{- end }}

{{/*
Expand the name of the chart.
*/}}
{{- define "ducks-tinder-client.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "ducks-tinder-client.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "ducks-tinder-client.labels" -}}
app: {{ include "ducks-tinder-client.app.name" . }}
app.kubernetes.io/name: ducks-tinder-client
app.kubernetes.io/instance: {{ .Release.Name }}
helm.sh/chart: {{ include "ducks-tinder-client.chart" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "ducks-tinder-client.selectorLabels" -}}
app: {{ include "ducks-tinder-client.app.name" . }}
app.kubernetes.io/name: {{ include "ducks-tinder-client.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
