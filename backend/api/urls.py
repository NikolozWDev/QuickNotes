from django.urls import path
from .views import CreateNoteView, DeleteNoteView, UpdateNoteView

urlpatterns = [
    path('notes/', CreateNoteView.as_view(), name="notes-list"),
    path('notes/delete/<int:pk>/', DeleteNoteView.as_view(), name="notes-delete"),
    path('notes/update/<int:pk>/', UpdateNoteView.as_view(), name="notes-update"),
]